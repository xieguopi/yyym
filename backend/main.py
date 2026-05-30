import random
import string
import os
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import func

import models
import schemas
from database import engine, get_db, Base

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "HTML", "assets")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="余姚杨梅预定系统", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if os.path.isdir(ASSETS_DIR):
    app.mount("/static", StaticFiles(directory=ASSETS_DIR), name="static")


def seed_data(db: Session):
    if db.query(models.Spec).count() == 0:
        specs = [
            models.Spec(id="s1", name="精品礼盒装", weight="500g", price=69,
                        note="1盒 · 约25颗 · 赠定制冰袋", tag="人气", stock=200),
            models.Spec(id="s2", name="双盒尝鲜装", weight="1kg", price=128,
                        note="2盒 · 约50颗 · 赠定制冰袋×2", tag="划算", stock=150),
            models.Spec(id="s3", name="家庭分享装", weight="2kg", price=238,
                        note="4盒 · 约100颗 · 赠保鲜泡沫箱", tag="送礼", stock=80),
        ]
        db.add_all(specs)

    if db.query(models.DeliveryDate).count() == 0:
        dates = [
            models.DeliveryDate(id="d1", day="6月8日", label="头茬开摘", sub="最早一批"),
            models.DeliveryDate(id="d2", day="6月15日", label="盛果期", sub="甜度最高"),
            models.DeliveryDate(id="d3", day="6月22日", label="末茬", sub="量少需抢"),
        ]
        db.add_all(dates)

    db.commit()


@app.on_event("startup")
def startup_event():
    from database import SessionLocal
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()


@app.get("/api/specs", response_model=list[schemas.SpecOut])
def get_specs(db: Session = Depends(get_db)):
    return db.query(models.Spec).all()


@app.get("/api/dates", response_model=list[schemas.DeliveryDateOut])
def get_dates(db: Session = Depends(get_db)):
    return db.query(models.DeliveryDate).all()


@app.post("/api/orders", response_model=schemas.OrderOut)
def create_order(payload: schemas.OrderCreate, db: Session = Depends(get_db)):
    spec = db.query(models.Spec).filter(models.Spec.id == payload.spec_id).first()
    if not spec:
        raise HTTPException(status_code=404, detail="规格不存在")

    date = db.query(models.DeliveryDate).filter(models.DeliveryDate.id == payload.date_id).first()
    if not date:
        raise HTTPException(status_code=404, detail="配送日期不存在")

    if spec.stock < payload.qty:
        raise HTTPException(status_code=400, detail="库存不足，请减少购买数量")

    order_no = "YM" + datetime.utcnow().strftime("%Y%m%d") + "".join(random.choices(string.digits, k=6))
    total = spec.price * payload.qty

    order = models.Order(
        order_no=order_no,
        spec_id=payload.spec_id,
        qty=payload.qty,
        date_id=payload.date_id,
        recipient_name=payload.recipient_name,
        recipient_phone=payload.recipient_phone,
        address=payload.address,
        total=total,
    )
    spec.stock -= payload.qty
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@app.get("/api/orders/{order_no}", response_model=schemas.OrderOut)
def get_order(order_no: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.order_no == order_no).first()
    if not order:
        raise HTTPException(status_code=404, detail="订单不存在")
    return order


@app.get("/api/stats", response_model=schemas.StatsOut)
def get_stats(db: Session = Depends(get_db)):
    total_orders = db.query(func.count(models.Order.id)).scalar() or 0
    remaining = db.query(func.sum(models.Spec.stock)).scalar() or 0
    return {"remaining": remaining, "total_orders": total_orders}


# ── 管理后台接口 ──────────────────────────────────────────────
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "yyym2026")


def check_admin(token: str = Query(..., description="管理员 token")):
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="token 错误")


@app.get("/api/admin/orders", response_model=list[schemas.OrderOut],
         dependencies=[Depends(check_admin)])
def admin_list_orders(db: Session = Depends(get_db)):
    """列出所有预定订单（最新在前）"""
    return db.query(models.Order).order_by(models.Order.id.desc()).all()


@app.get("/api/admin/stats", dependencies=[Depends(check_admin)])
def admin_stats(db: Session = Depends(get_db)):
    """管理统计：总订单数、总金额、各规格销售量"""
    total = db.query(func.count(models.Order.id)).scalar() or 0
    revenue = db.query(func.sum(models.Order.total)).scalar() or 0
    specs = db.query(models.Spec).all()
    return {
        "total_orders": total,
        "total_revenue": revenue,
        "specs": [{"name": s.name, "weight": s.weight,
                   "stock": s.stock, "price": s.price} for s in specs],
    }

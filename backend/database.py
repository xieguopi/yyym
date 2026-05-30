import os
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# 本地开发用 SQLite，生产环境用 Render 环境变量 DATABASE_URL（PostgreSQL）
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./yyym.db")

# Supabase/Heroku 的连接串以 postgres:// 开头，SQLAlchemy 需要 postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# PostgreSQL 不需要 check_same_thread
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

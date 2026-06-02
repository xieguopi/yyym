# 余姚杨梅 · 限时预定系统

> 产地直采 · 冷链直达 · 坏果包赔

手机端预定页 + 管理后台 + 微信小程序，全栈一体化部署。

---

## 🌐 线上地址

| 服务 | 地址 |
|------|------|
| 预定页（手机访问）| https://xieguopi.github.io/yyym/ |
| 管理后台 | https://xieguopi.github.io/yyym/#/admin |
| 后端 API | https://yyym.onrender.com |
| 代码仓库 | https://github.com/xieguopi/yyym |

---

## 🏗 系统架构

```
用户层        手机浏览器          微信小程序用户        管理员
                  │                    │                  │
前端层    GitHub Pages             微信小程序          /#/admin
          React + Vite           Taro 3.6 编译
                  │                    │
后端层         Render.com  ·  FastAPI + Python
               yyym.onrender.com
               /api/specs  /api/dates  /api/orders  /api/admin/*
                              │
数据层         Supabase  ·  PostgreSQL 17
               specs | delivery_dates | orders
               连接池 pooler.supabase.com:6543

DevOps    GitHub (xieguopi/yyym)
          └── push main → GitHub Actions → GitHub Pages
          └── push main → Render.com 自动重新部署
```

---

## 📁 目录结构

```
yyym/
├── frontend/                   # React + Vite 前端
│   ├── src/
│   │   ├── components/         # Hero / Story / Flavor / Freshness / Offer
│   │   ├── pages/
│   │   │   └── Admin.jsx       # 管理后台页面
│   │   ├── lib/
│   │   │   ├── api.js          # 后端 API 调用
│   │   │   └── hooks.js        # useCountdown 等
│   │   └── App.jsx             # 路由入口（hash router）
│   ├── public/assets/          # 已压缩图片（~124KB 总计）
│   ├── .env.production         # 生产环境 API 地址
│   └── vite.config.js
│
├── backend/                    # FastAPI 后端
│   ├── main.py                 # 路由 + 启动逻辑
│   ├── models.py               # SQLAlchemy 数据模型
│   ├── schemas.py              # Pydantic 验证
│   ├── database.py             # DB 连接（SQLite / PostgreSQL）
│   ├── requirements.txt
│   └── render.yaml             # Render.com 部署配置
│
├── miniprogram/                # 微信小程序（Taro）
│   ├── src/
│   │   ├── pages/index/        # 主页面
│   │   ├── components/         # 同前端组件移植版
│   │   └── lib/
│   │       ├── api.js          # Taro.request 封装
│   │       └── config.js       # API / 图片地址配置
│   └── dist/                   # 编译产物（导入微信开发者工具）
│
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 自动部署
├── render.yaml                 # Render.com 根配置
├── start.bat                   # 一键启动本地服务
└── README.md
```

---

## 🚀 本地开发

### 前置要求

- Node.js 20+
- Python 3.11+

### 启动后端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 启动前端

```bash
cd frontend
npm install
npm run dev
# 访问 http://localhost:5173
```

### 构建微信小程序

```bash
cd miniprogram
npm install
npm run dev:weapp
# 用微信开发者工具导入 miniprogram/dist/
```

---

## 📦 商品规格

| ID | 名称 | 重量 | 价格 | 说明 |
|----|------|------|------|------|
| s1 | 精品礼盒装 | 500g | ¥69 | 约 25 颗，赠定制冰袋 |
| s2 | 双盒尝鲜装 | 1kg | ¥128 | 约 50 颗，赠定制冰袋×2 |
| s3 | 家庭分享装 | 2kg | ¥238 | 约 100 颗，赠保鲜泡沫箱 |

## 📅 配送批次

| ID | 日期 | 批次 | 说明 |
|----|------|------|------|
| d1 | 6月8日 | 头茬开摘 | 最早一批 |
| d2 | 6月15日 | 盛果期 | 甜度最高 |
| d3 | 6月22日 | 末茬 | 量少需抢 |

---

## 🔌 API 接口

### 公开接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/specs` | 获取商品规格列表 |
| GET | `/api/dates` | 获取配送批次列表 |
| GET | `/api/stats` | 库存与订单统计 |
| POST | `/api/orders` | 提交预定订单 |
| GET | `/api/orders/{order_no}` | 查询订单详情 |

### 管理接口（需 token）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/orders?token=xxx` | 获取全部订单 |
| GET | `/api/admin/stats?token=xxx` | 管理统计数据 |

### 提交订单示例

```json
POST /api/orders
{
  "spec_id": "s1",
  "qty": 2,
  "date_id": "d1",
  "recipient_name": "张小梅",
  "recipient_phone": "13800138000",
  "address": "浙江省杭州市西湖区文三路"
}
```

---

## 🗄 数据库

### 数据表

**specs** — 商品规格
```sql
id, name, weight, price, note, tag, stock
```

**delivery_dates** — 配送批次
```sql
id, day, label, sub
```

**orders** — 预定订单
```sql
id, order_no, spec_id, qty, date_id,
recipient_name, recipient_phone, address, total, created_at
```

### 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接串（Render 环境变量） | `postgresql://...` |
| `ADMIN_TOKEN` | 管理后台密码，默认 `yyym2026` | 自定义密码 |

> 本地开发不设置 `DATABASE_URL` 时自动使用 SQLite（`yyym.db`）。

---

## 🔧 部署说明

### 前端（GitHub Pages）

推送到 `main` 分支自动触发 GitHub Actions 构建并部署，无需手动操作。

### 后端（Render.com）

1. 连接 GitHub 仓库，Root Directory 设为 `backend`
2. Build Command：`pip install -r requirements.txt`
3. Start Command：`uvicorn main:app --host 0.0.0.0 --port $PORT`
4. 设置环境变量 `DATABASE_URL`（Supabase 连接池地址）

### 微信小程序发布

1. 在 [mp.weixin.qq.com](https://mp.weixin.qq.com) 注册并获取正式 AppID
2. 修改 `miniprogram/project.config.json` 中的 `appid`
3. 修改 `miniprogram/src/lib/config.js` 中的 `API_BASE`（改为正式 HTTPS 地址）
4. 重新构建：`npm run build:weapp`
5. 在微信开发者工具中上传，提交审核

---

## ⚡ 性能优化

- 图片压缩：3.9MB → 124KB（mozjpeg，quality=72，宽度≤900px）
- Hero 图：`fetchPriority="high"` 优先加载
- 其余图片：`loading="lazy"` 按需加载
- 字体：Google Fonts `display=swap` 避免阻塞渲染

---

## 📱 管理后台

访问 `/#/admin`，默认密码 `yyym2026`。

功能：
- 总预定单数、总金额统计
- 各规格剩余库存
- 订单列表（支持按单号/姓名/手机/地址搜索）
- 实时刷新

修改管理密码：在 Render.com 服务环境变量中设置 `ADMIN_TOKEN`。

---

## 📄 License

MIT

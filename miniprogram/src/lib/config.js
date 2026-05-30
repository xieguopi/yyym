// 开发模式：图片来自本地后端，API 来自本地后端
// 生产模式：图片来自 GitHub Pages，API 来自 Render.com
const isProd = process.env.NODE_ENV === "production";

export const API_BASE    = isProd
  ? "https://yyym-api.onrender.com/api"
  : "http://localhost:8000/api";

export const STATIC_BASE = isProd
  ? "https://xiegp.github.io/yyym/assets"
  : "http://localhost:8000/static";

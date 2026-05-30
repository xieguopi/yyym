// 开发时通过 Vite proxy 转发到 localhost:8000
// 生产时使用 VITE_API_BASE 环境变量（Render.com 后端）
const BASE = import.meta.env.VITE_API_BASE || "/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "请求失败" }));
    throw new Error(err.detail || "请求失败");
  }
  return res.json();
}

export const api = {
  getSpecs: () => request("/specs"),
  getDates: () => request("/dates"),
  getStats: () => request("/stats"),
  createOrder: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  getOrder: (orderNo) => request(`/orders/${orderNo}`),
};

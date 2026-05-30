import Taro from "@tarojs/taro";
import { API_BASE } from "./config";

const BASE = API_BASE;

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE + path,
      method: options.method || "GET",
      data: options.body ? JSON.parse(options.body) : undefined,
      header: { "Content-Type": "application/json", ...options.header },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error((res.data && res.data.detail) || "请求失败"));
        }
      },
      fail: () => reject(new Error("网络连接失败")),
    });
  });
}

export const api = {
  getSpecs: () => request("/specs"),
  getDates: () => request("/dates"),
  getStats: () => request("/stats"),
  createOrder: (data) =>
    request("/orders", { method: "POST", body: JSON.stringify(data) }),
  getOrder: (orderNo) => request(`/orders/${orderNo}`),
};

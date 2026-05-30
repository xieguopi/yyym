import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages 部署路径: https://xiegp.github.io/yyym/
  base: command === "build" ? "/yyym/" : "/",
  server: {
    port: 5173,
    host: true, // 允许局域网手机访问
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
}));

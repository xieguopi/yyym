module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    // 发布时替换为您的 HTTPS 服务器地址，例如：
    // API_BASE: '"https://api.yourdomain.com/api"',
    API_BASE: '"http://localhost:8000/api"',
  },
  mini: {
    optimizeMainPackage: { enable: true },
  },
  h5: {},
};

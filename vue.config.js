const { defineConfig } = require("@vue/cli-service");
const isProduction = ["production"].includes(process.env.NODE_ENV);
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署時的子路徑名稱
  publicPath: process.env.BASE_URL,
  // 是否開啟 ESlint 檢測
  lintOnSave: !isProduction,
  // 產生source map文件(助於debug用)
  productionSourceMap: true,
  devServer: {
    server: "https",
    open: true,
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
  },
});

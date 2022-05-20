const path = require("path");

module.exports = {
  //全局缩写引用import路径
  chainWebpack: config => {
    config.resolve.alias.set("@src", path.join(__dirname, "./src"));
    config.resolve.alias.set("@assets", path.join(__dirname, "./src/assets"));
    config.resolve.alias.set("@components", path.join(__dirname, "./src/components"));
    config.resolve.alias.set("@config", path.join(__dirname, "./src/config"));
  },

  //全局CSS设置
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/config/css/main.scss";`
      }
    }
  },
};
const { defineConfig } = require("@vue/cli-service");
const registerRouter = require("./backend/router");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // 等于全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `,
      },
    },
  },

  devServer: {
    onBeforeSetupMiddleware(app) {
      registerRouter(app.app);
    },
  },
});

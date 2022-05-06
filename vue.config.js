const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: process.env.VUE_APP_BASE_PORT,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 把 `/api` 從字串移除
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: ['./src/styles/variables.sass', './src/styles/zIndex.sass']
    }
  }
};

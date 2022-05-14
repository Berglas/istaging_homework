module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    proxy: {
      '/https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: ['./src/styles/variables.sass', './src/styles/common.sass']
    }
  }
};

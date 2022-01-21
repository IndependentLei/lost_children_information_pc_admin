module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
    }
  },
//     lintOnSave:false, // 关闭语法检查
  // 开启代理服务器
  // devServer: {
  //   proxy: {
  //     '/api': {     //这里最好有一个 /
  //       target: 'http://localhost:9090',  // 后台接口域名
  //       ws: true,        //如果要代理 websockets，配置这个参数
  //       secure: false,  // 如果是https接口，需要配置这个参数
  //       changeOrigin: true,  //是否跨域
  //       pathRewrite:{
  //         '^/api':''
  //       }
  //     }
  //   }
  // }
}

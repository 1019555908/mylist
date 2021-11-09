// const path = require('path');
// const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const isProduction = process.env.NODE_ENV === 'production'

// module.exports = {
//     lintOnSave: 'warning',

//   lintOnSave: false,
//   runtimeCompiler: true,
//   publicPath: './', // 设置打包文件相对路径
//   // 这是前端解决跨域的代码
//   devServer: {
//        disableHostCheck:true,
//        open: process.platform === 'darwin', // 项目构建成功之后，自动弹出页面
//        host: '0.0.0.0', //允许外部ip访问,主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0 /* 设置为0.0.0.0则所有的地址均能访问 */

//        // open: process.platform === 'darwin',
//     // host: 'localhost',
//     port: 8080,
//     // open: true, //配置自动启动浏览器
//     // proxy: {
//     //   '/api': {
//     //     target: ``,//写上接口基地址
//     //     changeOrigin: true,
//     //     ws: true,
//     //     // secure: false, //如果是http接口，需要配置此参数
//     //     pathRewrite: {
//     //       '^/api': ''
//     //     }
//     //   }
//     // }
//   },
//   configureWebpack:{
//     resolve:{
//       alias:{
//         '@':path.resolve(__dirname, './src'),
//         '@i':path.resolve(__dirname, './src/assets'),
//       } 
//     },
//     plugins: [
//       new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

//       // 下面是下载的插件的配置
//       new CompressionWebpackPlugin({
//         algorithm: 'gzip',
//         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//         threshold: 10240,
//         minRatio: 0.8
//       }),
//       new webpack.optimize.LimitChunkCountPlugin({
//         maxChunks: 5, 
//         minChunkSize: 100
//       })
//     ]
//   }
// }
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
//选择1
module.exports = {
    lintOnSave: 'warning',
productionSourceMap: false,

    configureWebpack: config => {
        config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }))
    }
}

// 选择2
// module.exports = {
//     configureWebpack: {
//         // resolve: {
//         //     alias: {
//         //         '@': path.resolve(__dirname, './src'),
//         //         '@i': path.resolve(__dirname, './src/assets'),
//         //     }
//         // },
//         plugins: [
//             // 配置compression-webpack-plugin压缩
//             new CompressionWebpackPlugin({
//                 algorithm: 'gzip',
//                 test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//                 threshold: 10240,
//                 minRatio: 0.8
//             }),
//             new webpack.optimize.LimitChunkCountPlugin({
//                 maxChunks: 5,
//                 minChunkSize: 100
//             })
//         ]
//     }
// }
// // module.exports = {
// //     lintOnSave: 'warning',
// //     devServer: {
// //         disableHostCheck:true,
// //         // proxy: {
// //         //     'http://81.68.176.64:3000': {
// //         //         target: 'http://81.68.176.64:3000', //请求自己的数据库
// //         //         changeOrigin: true,
// //         //         pathRewrite: {
// //         //             '^http://81.68.176.64:3000': '/'
// //         //         }
// //         //     },
// //         //     // '/aaa': {
// //         //     //     target: 'http://172.16.5.135:3000/',

// //         //     // }
// //         // }
// //     }
// // }
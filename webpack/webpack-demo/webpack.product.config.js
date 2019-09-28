const path = require('path');
/** 自动生成带有script和link 标签的html文件 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/** 抽离css文件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** 压缩css文件 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/** js压缩 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/** 清理dist目录 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {

      // "@src":path.resolve("src"),
    }
  },
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,//抽离css
          {
          loader:'css-loader',
          options:{
            sourceMap:true
          }
        }, {
          loader: 'postcss-loader', //css预处理
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [
              require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
            ]
          }
        },{
          loader:'sass-loader',
          options:{
            sourceMap:true
          }
        }] //处理顺序从右向左
      },{
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          /** 可以处理css文件里面引入的图片，但是html里面的图片怎么处理？*/
          // 'file-loader',
          /** 可以替换掉file-loader, */
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          }
      //     {
      //       loader: 'image-webpack-loader',
      // options: {
      //   mozjpeg: {
      //     progressive: true,
      //     quality: 65
      //   },
      //   // optipng.enabled: false will disable optipng
      //   optipng: {
      //     enabled: false,
      //   },
      //   pngquant: {
      //     quality: [0.65, 0.90],
      //     speed: 4
      //   },
      //   gifsicle: {
      //     interlaced: false,
      //   },
      //   // the webp option will enable WEBP
      //   webp: {
      //     quality: 75
      //   }
      // }
      //     }


          /** 图片压缩优化 */
        ]
      }
    ]
  },
  plugins: [
    /** 将样式单独生成文件 */
    new MiniCssExtractPlugin({
      filename:  '[name][hash].css' , // 设置最终输出的文件名
      chunkFilename: '[id][hash].css' 
    }),
    /** 自动生成html文件 */
    new HtmlWebpackPlugin({
      title: 'webpack test', // 默认值：Webpack App
      /** 最终生成的文件名 */
      filename: 'main.html', // 默认值： 'index.html'
      /** 模板文件 */
      template: path.resolve(__dirname, 'src/main.html'),
      minify: {
        collapseWhitespace: true, // 折叠空白行
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    /** 清理dist */
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),//压缩js
    new OptimizeCSSAssetsPlugin({})] //压缩css
  }

};
# webpack学习笔记

[TOC]


#### webpack是什么？

webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 了解几个基本概念
### mode开发模式
webpack 提供 mode 配置选项，配置 webpack 相应模式的内置优化。
```javascript
// webpack.production.config.js
module.exports = {
+  mode: 'production',//production(生产环境)或者development（开发环境）
}
```
### 入口文件(entry)
可以配置一个或多个

### 出口文件(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
### loader
### 插件(plugins)
### 优化

## webpack的安装
###本地安装
````javascript
// 初始化一个package.json
npm init
// 安装webpackage -D
npm i -D webpack
// 如果是4.0之后的版本还需要安装webpack-cli
npm i -D webpack-cli

````
安装完成后可以配置npm 的script脚本
````javascript
// package.json
"scripts": {
    "start": "webpack --config webpack.config.js"
}
````
### 全局安装 webpack（不推荐)
将使 webpack 在全局环境下可用：
````javascript
npm install --global webpack
````
注意：不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

## 快速入门demo
- 创建项目结构

```javascript
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev

```
目录结构：

	webpack-demo/
		package.json
		dist/
			index.html
        src/
        	index.js/
    

- 第二步：安装 loadash 依赖和编写 js 文件

```javascript
npm install --save lodash
```
编写：src/index.js 文件
```javascript
import _ from 'lodash';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  return dom;
}

document.body.appendChild(createDomElement());
````
- 第三步：编写 webpack 配置文件根目录下添加 webpack.config.js文件。


```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  }
};
```
- 执行构建任务

```javascript
npx webpack
```
打开dist/index.html 就可以看见页面效果

## 加载非js文件

### 加载 CSS 文件

- 第一步： 安装 css 和 style 模块解析的依赖 style-loader 和 css-loader

```javascript
npm install --save-dev style-loader css-loader
```
 
- 第二步： 添加 css 解析的 loader

````javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  //从右开始解析
      }
    ]
  }
};
````

css-loader： 辅助解析 js 中的 import './main.css'
style-loader: 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签.依赖 css-loader
你可以在依赖于此样式的 js 文件中 导入样式文件，比如：import './style.css'。现在，当该 js 模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head>中。

- 第三步： 编写 css 文件和修改 js 文件
在 src 目录中添加 style/index.css文件


	webpack-demo/
		webpack.config.js
		/node_modules
		package.json
		dist/
			bundle.js
			index.html
        src/
			/style
				index.css
        	index.js/
    

```css
/* index.css */
.hello {
  color: red;
}
```
修改 index.js 文件

```javascript
  import _ from 'lodash';
+ import './style/index.css';

  function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
+   dom.className = 'hello';
    return dom;
  }

  document.body.appendChild(createDomElement());
```
最后重新打开 dist 目录下的 index.html 看一下文字是否变成了红色的了。

> ps:这里的css文件已经打包在了dist/main.js文件里面

### 加载Sass文件
加载 Sass 需要sass-loader

```javascript
npm install sass-loader node-sass -D
```

使用：
```javascript
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  }
};
```

为 sass 文件注入内容：

如果你要将 Sass 代码放在实际的入口文件(entry file)之前，可以设置 data 选项。此时 sass-loader 不会覆盖 data 选项，只会将它拼接在入口文件的内容之前。（没懂啥意思，回头在看）
```javascript
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}
```

> 注意：由于代码注入, 会破坏整个入口文件的 source map。通常一个简单的解决方案是，多个 Sass 文件入口。

### 创建 Source Map
css-loader和sass-loader都可以通过该 options 设置启用 sourcemap
启用sourcemap后可以看清楚的看见样式是在那个文件里写的，方便开发
```javascript
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.(sc|c|sa)ss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  }
};
```
### PostCSS处理loader（附带：添加 css3 前缀）
- 1.是什么
[PostCss](https://github.com/postcss/postcss/blob/HEAD/README-cn.md "PostCss")是一个CSS预处理工具，它通过自定义的插件和工具生态体系来重新定义css。它鼓励开发者使用规范的css原生语法编写代码，然后配置编译器转换需要兼容的浏览器版本，最后通过编译将源码转换为目标浏览器可用的css代码。

它和stylus的不同之处是它可以通过插件机制灵活地扩展其支持的特性，不像stylus的语法是固定的，它的用途非常多，比如css自动加前缀，使用下一代css语法等等
- 2.安装

```javascript
npm i -D postcss-loader
npm install autoprefixer --save-dev

# 以下可以不用安装
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
$ npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
```
- 3.在webpack中的配置

```javascript
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
```
在css文件里添加样式 `display:flex`, 执行`npx webpack` 就可以然后打开dist/index.html 就可以看见编译之后的效果：在flex前面加了前缀

### 样式表抽离成专门的单独文件

上面的style-loader 会将样式添加到html的style标签里，并不是我们想要的效果
首先以下的 css 的处理我们都把 mode 设置为 production。

> webpack4 开始使用： mini-css-extract-plugin插件, 1-3 的版本可以用： extract-text-webpack-plugin

抽取了样式，就不能再用 style-loader注入到 html 中了。
安装：

```javascript
npm install --save-dev mini-css-extract-plugin
```
webpack.product.config.js

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:  '[name].css' , // 设置最终输出的文件名
      chunkFilename: '[id].css' 
    })
  ]
};
```
运行`npx webpack --config webpack.product.config.js`打包：

在 dist 目录中已经把 css 抽取到单独的一个 css 文件中了。修改 html，引入此 css 就能看到结果了。
### 压缩 CSS

webpack5 貌似会内置 css 的压缩，webpack4 可以自己设置一个插件即可。

压缩 css 插件：`optimize-css-assets-webpack-plugin`

安装

```javascript
npm i -D optimize-css-assets-webpack-plugin
```
使用：

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:  '[name].css' , // 设置最终输出的文件名
      chunkFilename: '[id].css' 
    })
  ],
  optimization: {
   minimizer: [
     new UglifyJsPlugin({
		  cache: true,
		  parallel: true,
		  sourceMap: true // set to true if you want JS source maps
    }),//压缩js
    new OptimizeCSSAssetsPlugin({})] //压缩css
  }
};
```
### 压缩js
压缩js需要一个插件： `uglifyjs-webpack-plugin`, 此插件需要一个前提就是：mode: 'production'.

安装

```javascript
npm i -D uglifyjs-webpack-plugin
```
使用：见上面的代码

### 解决 CSS 文件或者 JS 文件名字哈希变化的问题

由于浏览器缓存问题，可能会导致文件内容已经更新，但是浏览器仍然使用的是之前的文件，所以这个时候就可以给文件加一个版本号（hash值）。但是每次的hash值都不一样，如何在dist/index.html文件中引用呢？

`HtmlWebpackPlugin`插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了。

安装

```javascript
npm install --save-dev html-webpack-plugin
```
使用：
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
  plugins: [
    new MiniCssExtractPlugin({
      filename:  '[name][hash].css' , // 设置最终输出的文件名
      chunkFilename: '[id][hash].css' 
    }),

    new HtmlWebpackPlugin({
      title: 'webpack test', // 默认值：Webpack App
      /** 最终生成的文件名 */
      filename: 'main[hash].html', // 默认值： 'index.html'
      /** 模板文件 */
      template: path.resolve(__dirname, 'src/main.html'),
      minify: {
        collapseWhitespace: true, // 折叠空白行
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ],
```
在package.json的scripts配置：
```javascript
 "scripts": {
    "build": "npx webpack --config webpack.product.config.js"
  },
```
执行`npm run build`就可以看见生成的main.html里面自动添加了带有hash值得js和css。
### 清理dist目录
只要文件改动，每次构建，我们的 /dist 文件夹都会保存生成的文件，然后就会非常杂乱。通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法

[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin "clean-webpack-plugin") 是一个比较普及的管理插件，让我们安装和配置下。

```javascript
npm install clean-webpack-plugin --save-dev
```


webpack.product.config.js
```javascript
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');

  module.exports = {
	...
    plugins: [
+     new CleanWebpackPlugin()
    ],
    ...
  };
```

现在执行 npm run build，再检查 /dist 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！

### 图片加载优化
file-loader处理文件的导入
[image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader "image-webpack-loader")可以帮助我们对图片进行压缩和优化
```javascript
npm install --save-dev file-loader
npm install image-webpack-loader --save-dev
```
使用：
```javascript
module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          /** 处理图片导入 */
          'file-loader',{
            loader: 'image-webpack-loader',/** 图片压缩优化 */
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65,0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ]
      }
    ]
  }
```
> 在css中引入的图片通过file-loader处理后还能正常显示，但是如何在html中引入图片？
```javascript
<img src=" <%= require('./assets/images/webpack.jpg')%> alt="">"
```

> image-webpack-loader 在使用过程中报错，解决方法未知？？？？



### 图片处理为base64
`url-loader`功能类似于 `file-loader`，可以把 url 地址对应的文件，打包成 base64 的 DataURL，提高访问的效率。

如何使用：

```javascript
npm install --save-dev url-loader
```
 
webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          },
        ]
      }
    ]
  }
};
```
### 字体处理
由于 css 中可能引用到自定义的字体，处理也是跟图片一致。
## 开发相关辅助

### 合并两个webpack的js配置文件
### js 使用 source map
### 监控文件变化，自动编译。使用观察模式
### 使用 webpack-dev-server 和热更新
### JS启用babel转码

### Babel优化

### ESLint校验代码格式规范

## 解析（resolve）






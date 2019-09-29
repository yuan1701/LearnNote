# webpack学习笔记

[TOC]

## webpack是什么

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

### 本地安装

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

> ps:这里的css文件已经打包在了dist/main.js文件里面,就不需要单独引入了

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
像下面这样象ejs的写法

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


开发环境(development)和生产环境(production)配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点， 就非常不爽。

webpack-merge 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。

安装：

```javascript
npm install --save-dev webpack-merge
```

例如：

project

  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules


```javascript
// webpack.common.js

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Production'
     })
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   }
 };
```
 
```javascript
// webpack.dev.js

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',//说明 js 原始出错的位置
  devServer: {
    contentBase: './dist'
  }
});
```

```javascript
// webpack.prod.js

 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   plugins: [
     new UglifyJSPlugin()
   ]
 });
```

### js 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。

使用 inline-source-map 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）：

```javascript
// 在开发环境下

  module.exports = {
   ...
    devtool: 'inline-source-map',
   ...
  };
```



### 监控文件变化，自动编译，使用观察模式
每次修改完毕后，都手动编译异常痛苦。最简单解决的办法就是启动watch。

```javascript
npx webpack --watch
```
 
当然可以添加到 npm 的 script 中

```javascript
// package.json
{
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "npx webpack --watch",
      "build": "npx webpack"
    },
  }
```


但是有个 bug，就是每次我们修改 js 或者 css 文件后，要看到修改后的 html 的变化，需要我自己重新刷新页面。

如何能不刷新页面，自动更新变化呢？

### 使用 webpack-dev-server 和热更新
webpack-dev-server 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

安装

```javascript
npm install --save-dev webpack-dev-server
```
使用 
```javascript
// webpack.config.js

  module.exports = {
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
  };
```
启动此 webserver：

webpack-dev-server --open

官网其他配置：

```javascript
devServer: {
  clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
  hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  contentBase:  path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
  compress: true, // 一切服务都启用gzip 压缩
  host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
  port: 8080, // 端口
  open: true, // 是否打开浏览器
  overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
    warnings: true,
    errors: true
  },
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
  proxy: {  // 设置代理
    "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
      target: "http://192.168.0.102:8080",
      pathRewrite: {"^/api" : "/mockjsdata/5/api"}
    }
  },
  quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  watchOptions: { // 监视文件相关的控制选项
    poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
    ignored: /node_modules/, // 忽略监控的文件夹，正则
    aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
  }
}
```

如何启用热更新呢？

```javascript
webpack.config.js

  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
       app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
+     new webpack.HotModuleReplacementPlugin()  // 替换插件
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

### JS启用babel转码
虽然现代的浏览器已经兼容了96%以上的ES6的语法了，但是为了兼容老式的浏览器（IE8、9）我们需要把最新的ES6的语法转成ES5的。那么babel的loader就出场了。

安装

```javascript
npm i -D babel-loader babel-core babel-preset-env
 
```
用法

在webpack的配置文件中，添加js的处理模块。

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```

然后，在项目根目录下，添加babel的配置文件 .babelrc.

.babelrc文件如下：
```javascript
{
  "presets": ["env"]
}
```

最后，在入口js文件中，添加ES6的❤新语法：

```javascript
class Temp {
  show() {
    console.log('this.Age :', this.Age);
  }
  get Age() {
    return this._age;
  }
  set Age(val) {
    this._age = val + 1;
  }
}

let t = new Temp();
t.Age = 19;

t.show();
```
 
最后打包：

```javascript
npx webpack
```

最终打包后的js代码：

```javascript
var a = 1,
    b = 3,
    c = 9;

console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

var Temp = function () {
  function Temp() {
    _classCallCheck(this, Temp);
  }

  _createClass(Temp, [{
    key: 'show',
    value: function show() {
      console.log('this.Age :', this.Age);
    }
  }, {
    key: 'Age',
    get: function get() {
      return this._age;
    },
    set: function set(val) {
      this._age = val + 1;
    }
  }]);

  return Temp;
}();

var t = new Temp();
t.Age = 19;

t.show();
```

### Babel优化
```javascript
babel-loader可以配置如下几个options：

cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。

cacheIdentifier：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容（存在的情况下），环境变量 BABEL_ENV 的值（没有时降级到 NODE_ENV）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。

forceEnv：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。

注意：sourceMap 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 devtool 配置选项），将会自动生成 sourceMap。

babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 babel runtime 作为一个独立模块，来避免重复引入。
```

安装：

```javascript
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```
 
配置：

```javascript
// webpack.config.js

rules: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
    }
  }
]
```

修改.babelrc

```javascript
{
  "presets": ["env"],
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

此时，webpack打包的时候，会自动优化重复引入公共方法的问题。

### ESLint校验代码格式规范
安装

```javascript
npm install eslint --save-dev
npm install eslint-loader --save-dev
```

 以下是用到的额外的需要安装的eslint的解释器、校验规则等
```javascript
npm i -D babel-eslint standard
Copy to clipboardErrorCopied
```
使用

```javascript
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          fix: true
        }
      },
    ],
  },
  // ...
}
```

eslint配置可以直接放到webpack的配置文件中，也可以直接放到项目根目录的 .eslintrc中文档。

// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  globals: {
    NODE_ENV: false
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off',
    'space-before-function-paren': ['error', 'never'],
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ]
  }
};
Copy to clipboardErrorCopied
此时eslint的配置就结束了。

到此为止，一个完整的开发阶段的webpack的配置文件
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8085, // 端口
    open: true, // 是否打开浏览器
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: { // 设置代理
      "/api": { // 访问api开头的请求，会跳转到  下面的target配置
        target: "http://192.168.0.102:8080",
        pathRewrite: {
          "^/api": "/mockjsdata/5/api"
        }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(), // 更容易查看(patch)的依赖
    new webpack.HotModuleReplacementPlugin(), // 替换插件
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      },
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  optimization: {}
};
```

用于生产环境的配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name][hash].css', chunkFilename: '[id][hash].css'}),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```

## 解析(resolve)
配置模块如何解析。比如： import _ from 'lodash' ,其实是加载解析了lodash.js文件。此配置就是设置加载和解析的方式。

resolve.alias
创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：

// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
+ resolve: {
+   alias: {
+     vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
+     '@': path.resolve(__dirname, 'src/')
+   }
+ }
  ...
}

// index.js
// 在我们的index.js文件中，就可以直接import
import vue from 'vue';
// 等价于
import vue from  'src/lib/vue/dist/vue.esm.js';
Copy to clipboardErrorCopied
resolve.extensions的应用
自动解析确定的扩展。

// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {
      vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'src/')
    },
+   extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
  }
  ...
}
Copy to clipboardErrorCopied
给定对象的键后的末尾添加 $，以表示精准匹配

外部扩展(externals)
externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。 文档

例如，从 CDN 引入 jQuery，而不是把它打包：

index.html

<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
Copy to clipboardErrorCopied
webpack.config.js

// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
+ externals: {
+   jquery: 'jQuery'
+ },
  ...
}
Copy to clipboardErrorCopied
这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：

import $ from 'jquery';

$('.my-element').animate(...);
Copy to clipboardErrorCopied
具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。外部 library 可能是以下任何一种形式：

root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
commonjs：可以将 library 作为一个 CommonJS 模块访问。
commonjs2：和上面的类似，但导出的是 module.exports.default.
amd：类似于 commonjs，但使用 AMD 模块系统。
不同的配置方式：

externals : {
  react: 'react'
}

// 或者

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // 指向全局变量
  }
}

// 或者

externals : {
  subtract : {
    root: ["math", "subtract"]   // 相当于： window.math.substract
  }
}
Copy to clipboardErrorCopied
构建目标(targets)
webpack 能够为多种环境或 target 构建编译。想要理解什么是 target 的详细信息，请阅读 target 概念页面。

target: 告知 webpack 为目标(target)指定一个环境。

可以支持以下字符串值：

选项	描述
async-node	编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）
electron-main	编译为 Electron 主进程。
electron-renderer	编译为 Electron 渲染进程，使用 JsonpTemplatePlugin, FunctionModulePlugin 来为浏览器环境提供目标，使用 NodeTargetPlugin 和 ExternalsPlugin 为 CommonJS 和 Electron 内置模块提供目标。
node	编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk）
node-webkit	编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 nw.gui 导入（实验性质）
web	编译为类浏览器环境里可用（默认）
webworker	编译成一个 WebWorker
例如，当 target 设置为 "electron"，webpack 引入多个 electron 特定的变量.

webpack.config.js

// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
  externals: {
    jquery: 'jQuery'
  },
+ target: 'node'
  ...
}
Copy to clipboardErrorCopied
相关的loader列表
webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

文件
raw-loader 加载文件原始内容（utf-8）
val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
file-loader 将文件发送到输出文件夹，并返回（相对）URL
JSON
json-loader 加载 JSON 文件（默认包含）
json5-loader 加载和转译 JSON 5 文件
cson-loader 加载和转译 CSON 文件
转换编译(Transpiling)
script-loader 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
buble-loader 使用 Bublé 加载 ES2015+ 代码，并且将代码转译为 ES5
traceur-loader 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5
ts-loader 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+
coffee-loader 像 JavaScript 一样加载 CoffeeScript
模板(Templating)
html-loader 导出 HTML 为字符串，需要引用静态资源
pug-loader 加载 Pug 模板并返回一个函数
jade-loader 加载 Jade 模板并返回一个函数
markdown-loader 将 Markdown 转译为 HTML
react-markdown-loader 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
posthtml-loader 使用 PostHTML 加载并转换 HTML 文件
handlebars-loader 将 Handlebars 转移为 HTML
markup-inline-loader 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。
样式
style-loader 将模块的导出作为样式添加到 DOM 中
css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
less-loader 加载和转译 LESS 文件
sass-loader 加载和转译 SASS/SCSS 文件
postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
stylus-loader 加载和转译 Stylus 文件
清理和测试(Linting && Testing)
mocha-loader 使用 mocha 测试（浏览器/NodeJS）
eslint-loader PreLoader，使用 ESLint 清理代码
jshint-loader PreLoader，使用 JSHint 清理代码
jscs-loader PreLoader，使用 JSCS 检查代码样式
coverjs-loader PreLoader，使用 CoverJS 确定测试覆盖率
框架(Frameworks)
vue-loader 加载和转译 Vue 组件
polymer-loader 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件
angular2-template-loader 加载和转译 Angular 组件
Awesome 更多第三方 loader，查看 awesome-webpack 列表。
打包分析优化
webpack-bundle-analyzer插件可以帮助我们分析打包后的图形化的报表。

仅仅在开发环境使用。

安装

npm install --save-dev webpack-bundle-analyzer
Copy to clipboardErrorCopied
+ const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports = {
    plugins: [
+     new BundleAnalyzerPlugin()
    ]
  }
Copy to clipboardErrorCopied
自动生成一个网页报表，如下所示：
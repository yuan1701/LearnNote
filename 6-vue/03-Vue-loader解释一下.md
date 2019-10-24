vue-loader：解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。
 

css-loader：加载由 vue-loader 提取出的 CSS 代码。
 

vue-template-compiler：把 vue-loader 提取出的 HTML 模版编译成对应的可执行的 JavaScript 代码，这和 React 中的 JSX 语法被编译成 JavaScript 代码类似。预先编译好 HTML 模版相对于在浏览器中再去编译 HTML 模版的好处在于性能更好。
总结;vue-loader的作用:
1.可以动态渲染一些数据
2.对三个标签都做了优化，script中可以直接使用es6，style中可以默认使用sass，还提供了作用域的选择
3. `<template src='../hello.vue'></template> `

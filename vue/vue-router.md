## vue-router入门级

[TOC]
### vue-router是什么？
SPA（单页应用）的路径管理器。再通俗的说，vue-router就是WebApp的链接路径管理系统。 vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系。
> a标签也可以实现路由页面切换和跳转，为什么还要用vue-router?

> 因为用Vue做的通常都是单页应用（当你的项目准备打包时，运行npm run build时，就会生成dist文件夹，这里面只有静态资源和一个index.html页面），所以你写的标签是不起作用的，你必须使用vue-router来进行管理。

> 那么用vue来开发混合模式应用的话是用不到vue-router的（自己感觉应该是对的，先做记录）

### vue-router实现原理
SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。

单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面

vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。

**1.Hash模式**：
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件。

**2.History模式**：
由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。

//main.js文件中
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 yoursite.com/user/id， 比较好… 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 oursite.com/user/id 就会返回 404，这就不好看了。 所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

```javascript
 export const routes = [ 
  {path: "/", name: "homeLink", component:App}
  {path: "/register", name: "registerLink", component: Register},
  {path: "/login", name: "loginLink", component: Login},
  {path: "*", redirect: "/"}]
```

此处就设置如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面

**3.使用路由模块来实现页面跳转的方式**

    方式1：直接修改地址栏
    
    方式2：this.$router.push(‘路由地址’)
    
    方式3：<router-link to="路由地址"></router-link>


### vue-router基本使用
1.下载
```javascript
npm i vue-router -S
``` 
2.在main.js中引入 
```javascript
import VueRouter from 'vue-router';
```
3.安装插件
```javascript
Vue.use(VueRouter); 
```
4.创建路由对象并配置路由规则
```javascript
let router = new VueRouter({routes:[{path:'/home',component:Home}]});
```
5.将其路由对象传递给Vue的实例，options中加入 
```javascript
router:router 
```
6.在app.vue中留坑
```javascript
<router-view></router-view>
```
7.实现一个导航

具体实现请看如下代码：

```javascript
//main.js文件中引入
import Vue from 'vue';
import VueRouter from 'vue-router';
//主体
import App from './components/app.vue';
import Home from './components/home.vue'
//安装插件
Vue.use(VueRouter); //挂载属性
//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        //一个个对象
		{ path: '/', component: App},
        { path: '/home', component: Home }
    ],
	// ps: 可以让路由前面的#不见，因为#不好看纠结了很久
	mode:"history"
	
});
//new Vue 启动
new Vue({
    el: '#app',
    //让vue知道我们的路由规则
    router: router, //可以简写router
    render: c => c(App),
})
```
在app.vue中：
```javascript
<template>
    <div>
		<!--  两种写法有什么不同1.第一种会重新加载整个页面 ，2.第二种不会-->
		<a href="/">app</a>
		<router-link :to="/home">home</router-link>
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
```
 基本使用介绍完了，但是在实际应用中远远没有这么简单，可能会用到路由传参，可能会用到路由的钩子函数来判断用户权限等等

### this.$router和this.$route，routes
在上面第5步里面讲router注入到根实例中，我们就可以在任何组件内通过this.$router访问路由器，也可以通过this.$route访问当前路由对象
> 真的好难分清，this.$router和this.$route，先来看看有什么区别吧

- $router是指整个路由实例,你可以操控整个路由,通过'$router.push'往其中添加任意的路由对象.
	```javascript
	this.$router.go(-1)
	this.$router.push('/')
```
- $route是指当前路由实例('$router')跳转到的路由对象;
```javascript
	this.$route.params // 获取当前路由参数
```
- 路由实例可以包含多个路由对象.它们是父子包含关系.

> routes，指router路由实例的routes API.用来配置多个route路由对象.


### 嵌套路由

　嵌套路由，主要是由我们的页面结构所决定的。当我们进入到home页面的时候，它下面还有分类，如手机系列，平板系列，电脑系列。当我们点击各个分类的时候，它还是需要路由到各个部分，如点击手机，它肯定到对应到手机的部分。

　　在路由的设计上，首先进入到 home ,然后才能进入到phone, tablet, computer.  Phone, tablet, compute 就相当于进入到了home的子元素。所以vue提供了childrens 属性，它也是一组路由,相当于我们所写的routes。

　　首先，在home页面上定义三个router-link 标签用于导航，然后再定义一个router-view标签，用于渲染对应的组件。router-link 和router-view 标签要一一对应。home.vue 组件修改如下：

```javascript
<template>
    <div>
        <h1>home</h1>
<!-- router-link 的to属性要注意，路由是先进入到home,然后才进入相应的子路由如 phone,所以书写时要把 home 带上 -->
        <p>
            <router-link to="/home/phone">手机</router-link>
            <router-link to="/home/tablet">平板</router-link>
            <router-link to="/home/computer">电脑</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
```
router.js 配置路由，修改如下：
```javascript

const routes = [
    {
        path:"/home",
　　　　　// 下面这个属性不可少，因为，我们是先进入home页面，才能进入子路由
        component: home,
　　　　 // 子路由
        children: [
            {
                path: "phone",
                component: phone
            },
            {
                path: "tablet",
                component: tablet
            },
            {
                path: "computer",
                component: computer
            },
			 // 当进入到home时，如果要默认显示一个组件的时候要加上
			{
				path: "",
				component: phone
			}
        ]
    },
]
```

### 动态路由匹配
上面我们定义的路由，都是严格匹配的，只有router-link 中的to属性和 js 中一条路由route中 path 一模一样，才能显示相应的组件component. 但有时现实却不是这样的，当我们去访问网站并登录成功后，它会显示 欢迎你，+ 你的名字。对于所有ID各不相同的用户,都要使用这个组件来渲染.这时我们就可以配置动态路由来实现. 动态路由匹配本质上就是通过url进行传参
**1.使用params进行配置**
```javascript
routes:[{
	path:'/user/:id', //动态路径参数,以冒号开头
	component:User
},{
	path:'/user/:shot/foo/:id', 
	component:shotCat
}]
```
有时候,同一个路径可以匹配多个路由,此时,匹配的优先级就按照路由的定义顺序.谁先定义的,谁的优先级就最高.
由于路由参数对组件实例是复用的.例如:/user/foo 和 /user/bar在使用路由参数时,复用的都是User组件.此时组件的生命周期钩子不会再被调用。如果你想路径切换时,进行一些初始化操作时,可以用以下两种解决办法:
在组件内 watch $route 对象：
```javascript
const User = {
 template: '...',
 watch: {
   '$route' (to, from) {
     // 对路由变化作出响应...
   }
 }
}
```

使用2.2版本中的 beforeRouteUpdate 路由守卫：
```javascript
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
	// react to route changes...
	// don't forget to call next()
  }
}
```

**2.通过query进行配置传参**
在项目里我们可以通过上面提到的params进行传参.同时也可以用query进行传参. 举个例子: <router-link to="/user?id=foo">foo</router-link> vue-route会自动将?后的id=foo封装进this.$route.query里. 此时,在组件里this.$route.query.id值为'foo'. ==除了通过router-link的to属性. query也可以通过后面讲到的编程式导航进行传参==

### 编程式导航
主要应用到按钮点击上。当点击按钮的时候，跳转另一个组件, 这只能用代码，调用rourter.push() 方法。 当们把router 注入到根实例中后，组件中通过 this.$router 可以获取到router, 所以在组件中使用

this.$router.push("home"), 就可以跳转到home界面


### 路由组件传参
1.params传参
2.query传参
3.props传参
路由传参,可以通过前面介绍的params和query进行传参.但这两种传参方式,本质上都是把参数放在url上,通过改变url进行的.这样就会造成参数和组件的高度耦合. 如果我想传参的时候,可以更自由,摆脱url的束缚.这时就可以使用route的props进行解耦.提高组件的复用,同时不改变url.
4.



### 重定向和别名

- 重定向其实就是通过路由.拦截path,然后替换url跳转到redirect所指定的路由上. 重定向是通过 routes 配置来完成，

```javascript
// 从 /a 重定向到 /b
const router = new VueRouter({
	routes:[
		{path:'/a',rediret:'/b'}
	]
})

// 从 /a 重定向到 命名为'foo'的路由
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：
```javascript
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
	  const { hash, params, query } = to
	  //这里使用了ES6的解构写法,分别对应了to的hash模式,params,query参数.这里解构就不具体说明了.
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
    }}
  ]
})
```

- 重定向是替url换路径,达到路由跳转.那别名就是一个路由有两个路径.两个路径都能跳转到该路由. 别名是在routes里的alias进行配置:

```javascript
const router = new VueRouter({
//这时,路径'/fxxksky'和'/two-dogs' 都会跳转到A
  routes: [
    { path: '/fxxksky', component: A, alias: '/two-dogs' }
	//当有多个别名时,alias也可以写成数组形式.  alias: ['/two-dogs', 'three-dogs','four-dogs','five-dogs'] 
  ]
})
```


https://juejin.im/post/5b82bcfcf265da4345153343

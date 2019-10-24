import Vue from 'vue'
import App from './App'
// 设置提示功能关闭
Vue.config.productionTip = false
// 声明当前组件类型
App.mpType = 'app'
// 生成应用实例
const app = new Vue(App)
// 挂载整个应用
app.$mount()

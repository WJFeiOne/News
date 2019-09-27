/* 
    项目 入口文件 
*/


import Vue from "vue";                // 导入 Vue 库文件
import Vant from 'vant';              // 导入 Vant-UI 组件
import axios from "axios";            // 导入 axios 组件
import VueRouter from "vue-router";   // 导入 路由构造函数
import App from "@/App";              // 导入 入口组件
import Login from "@/pages/Login";    // 导入 登录组件
import Register from "@/pages/Register"  // 导入 注册组件


// 注册 路由组件 插件
Vue.use(VueRouter);


// 注册 Vant-UI 组件
Vue.use(Vant)


// 把 axios 挂载到原型
Vue.prototype.$axios=axios;


// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";


// 创建 路由配置
const routes = [
    { path: "/login", component: Login}, // 匹配 登录组件地址
    { path: "/register", component: Register} // 匹配 注册组件地址
]


// 创建 路由对象
const router = new VueRouter({
    routes  // 传入 路由配置
});


// 创建 Vue 根实例
new Vue({
    // 指定 实例容器
    el: "#app",
 
    // 挂载 路由到根实例
    router,

    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement) {
        // render 函数使用固定的写法，只有 App 是可变；
        return createElement(App);
    }
})
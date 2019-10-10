/* 项目 入口文件 */


import Vue from "vue";                // 导入 Vue 库文件
import Vant from 'vant';              // 导入 Vant-UI 组件
import axios from "axios";            // 导入 axios 组件
import VueRouter from "vue-router";   // 导入 路由构造函数
import App from "@/App";              // 导入 入口组件
import {Toast} from "vant"            // 导入 轻提示组件
import routes from "@/routes/routes"; // 导入 路由配置 


// 注册 路由组件 插件
Vue.use(VueRouter);

// 注册 Vant-UI 组件
Vue.use(Vant)

// 把 axios 挂载到原型
Vue.prototype.$axios=axios;


// 基准路径，以后每次请求都会自动在前面加上该路径
// axios.defaults.baseURL = "http://localhost:3000";
// 添加 手机测试 基准路径
axios.defaults.baseURL = "http://192.168.43.118:3000";


// 创建 路由对象
const router = new VueRouter({
    routes  // 传入 路由配置
});


// 创建 路由守卫 
// to 要跳转之后的页面
// from 跳转之前的页面
// next 必须要调用next()。调用才会执行跳转，还可以重定向，next("/login")
router.beforeEach( (to, from, next) => {
    // 获取本地 token 值
    const hasToken = localStorage.getItem("token");

    // 判断是否 需要登陆权限
    if(to.path === "/personal" || to.path === "/edit_profile"){
        // 判断本地是否有 token
        if(hasToken){
            // 有 token 正常跳转
            next();
        }else{
            // 没有 token 跳转到登录
            next("/login")
        }
    }else{
        // 正常跳转 不需要登陆权限 的页面
        next();
    }

})


// 创建 axios 的统一拦截器
axios.interceptors.response.use(res=>{
    // 解构 状态码
    const {message,statusCode}=res.data;

    // 判断 状态码是否失败
    if (statusCode===401){
        // 弹出提示
        Toast.fail(message);
    }

    // 判断 token 是否过期了，或者 token 无效
    if(message === "用户信息验证失败"){
        // 跳转到 登录页
        router.push('/login')
    }
    
    // 返回 响应数据信息
    return res;
})


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
/* 项目 路由文件 */


import Login from "@/pages/Login/Login_1";                     // 导入 登录组件
import Register from "@/pages/Register/Register_1"             // 导入 注册组件
import Personal from "@/pages/Personal/Personal_1";            // 导入 个人中心组件
import EditProfile from "@/pages/EditProfile/EditProfile_1";   // 导入 编辑资料组件
import UserFollow from "@/pages/UserFollow/UserFollow_1";      // 导入 我的关注组件
import UserComment from "@/pages/UserComment/UserComment_1";   // 导入 我的跟帖组件

import Index from "@/pages/Index/Index_1";                     // 导入 新闻首页组件
import PostDetail from "@/pages/PostDetail/PostDetail_1";      // 导入 文章详情组件
import Comment from "@/pages/Comment/Comment_1";               // 导入 评论跟帖组件


// 创建 路由配置
const routes = [
    { path: "/login", component: Login},                    // 匹配 登录组件地址
    { path: "/register", component: Register},              // 匹配 注册组件地址
    { path: "/personal", component: Personal},              // 匹配 个人中心组件地址
    { path: "/edit_profile", component: EditProfile },      // 匹配 编辑资料组件地址
    { path: "/user_follow", component: UserFollow },        // 匹配 我的关注组件地址
    { path: "/user_comment", component: UserComment },      // 匹配 我的跟帖组件地址
    
    { path: "/", component: Index },                        // 匹配 新闻首页组件地址
    { path: "/post_detail/:id", component: PostDetail },    // 匹配 文章详情组件地址
    { path: "/post_comment/:id", component: Comment },      // 匹配 评论跟贴组件地址
]


// 导出 路由文件
export default routes;


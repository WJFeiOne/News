<script>/* 个人中心 组件 */</script>


<template>
    <!-- 个人中心组件 -->
    <div>
        <!-- 添加 点击跳转到 编辑页面 -->
        <router-link to="/edit_profile">
        <div class="profile">
            <!-- 用户头像 -->
            <img :src="profile.head_img" alt />
            <div class="profile-center">
                <!-- 用户昵称 -->
                <div class="name">
                    <span class="iconfont iconxingbienan"></span>
                    {{profile.nickname}}
                </div>
                <!-- 注册时间 -->
                <div class="time">2019-9-24</div>
            </div>
            <!-- 字体箭头 -->
            <span class="iconfont iconjiantou1"></span>
        </div>
        </router-link>
        <!-- 调用条形组件 添加我的关注组件-->
        <router-link to="/user_follow">
            <CellBar label="我的关注" text="关注的用户"/>
        </router-link>

        <!-- 调用条形组件 添加我的跟帖组件-->
        <router-link to="/user_comment">
            <CellBar label="我的跟帖" text="跟帖/回复"/>
        </router-link>

        <!-- 调用条形组件 -->
        <CellBar label="我的收藏" text="文章/视频" />

        <!-- 调用条形组件 -->
        <CellBar label="返回首页" text="" @click="returnIndex" />

        <!-- 退出登录 -->
        <span class="handleLogout" @click="handleLogout">退出</span>
    </div>
</template>


<script>
// 导入 个人中心 实例
import config from "./Personal";

// 导出 个人中心 实例
export default config;
</script>


<style scoped lang="less">
// 导入 个人中心 样式    
@import url("./Personal.less");
</style>
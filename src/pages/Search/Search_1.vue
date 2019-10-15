<script>/* 搜索文章页面 组件 */</script>


<template>
    <!-- 搜索页面组件布局 -->
    <div class="container">
        <!-- 头部搜索框样式 -->
        <div class="header">
            <!-- 返回箭头图标 -->
            <span class="iconfont iconjiantou2" @click="$router.back()"></span>
            <!-- 搜索框 -->
            <div class="input-wrap">
                <!-- 搜索图标 -->
                <span class="iconfont iconsearch"></span>
                <!-- 搜索输入框 -->
                <input type="text" v-model="keyword" placeholder="搜索关键字">
            </div>
            <!-- 搜索按钮 -->
            <span class="search-btn" @click="handleSearch">搜索</span>
        </div>

        <div class="list">
            <!-- 调用首页用过的文章模块的组件 -->
            <PostCard v-for="(item, index) in list" :key="index" :post="item"/>
        </div>
    </div>
</template>

<script>
// 导入 搜索文章页面 实例
import config from "./Search";

// 导出 搜索文章页面 实例
export default config;
</script>


<style scoped lang="less">
// 导入 搜索文章页面 样式    
@import url("./Search.less");
</style>
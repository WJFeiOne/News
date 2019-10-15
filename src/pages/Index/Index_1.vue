<script>/* 新闻首页 组件*/</script>


<template>
    <!-- 新闻首页组件 -->
    <div>
        <!-- 头部搜索 -->
        <div class="header">
            <!-- 头部 logo -->
            <span class="iconfont iconnew logo"></span>
            <!-- 头部搜索链接 -->
            <router-link to="/search" class="link-search">
                <!-- 头部搜索样式 -->
                <div class="header-search">
                <!-- 搜索字体图标 -->
                <span class="iconfont iconsearch"></span>
                <!-- 输入框提示 -->
                <i>搜索新闻</i>
                </div>
            </router-link>
            
            <!-- 个人中心链接 -->
            <router-link to="/personal">
                <!-- 个人中心字体图标 -->
                <span class="iconfont iconwode personal"></span>
            </router-link>
        </div>

        <!-- 第三方头部栏目组件 v-model: 默认选中的标签栏 sticky: 配置粘性布局 swipeable: 滑动切换-->
        <van-tabs v-model="active" sticky swipeable>
            <!-- 遍历栏目标题数据 -->
            <van-tab v-for="(item, index) in categories" :key="index" :title="item.name" >    
            <!-- 调用文章模块组件，遍历文章数据 v-model: 列表是否在加载 finished: 是否加载完毕 load: 到底部触发的事件 immediate-check 禁止list立即出发onload-->
            <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <!-- 文章模块组件，post是单篇文章详情 -->
                <PostCard v-for="(item, index) in item.posts" :key="index" :post="item"/>
            </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>


<script>
// 导入 新闻首页 实例
import config from "./Index";

// 导出 新闻首页 实例
export default config;
</script>


<style scoped lang="less">
// 导入 新闻首页 样式    
@import url("./Index.less");
</style>
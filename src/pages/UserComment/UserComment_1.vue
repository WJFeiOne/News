<script>/* 我的跟帖页面 组件*/</script>


<template>
    <!-- 我的跟帖组件 -->
    <div>
        <!-- 调用板块头部组件 -->
        <HeaderNormal title="我的跟帖" />

        <!-- 评论的列表 -->
        <div class="comment-item" v-for="(item, index) in list" :key="index" >
            <!-- 评论时间 -->
            <div class="time">2019-9-25 10:10</div>

            <!-- 当前的评论回复的评论 -->
            <div class="parent" v-if="item.parent">
                <!-- 回复评论的昵称 -->
                <div class="parent-title">@: {{ item.parent.user.nickname }}</div>
                <!-- 回复评论的内容 -->
                <div class="parent-content">{{ item.parent.content }}</div>
            </div>

            <!-- 个人评论的内容 -->
            <div class="content">{{ item.content }}</div>
            
            <!-- 跟帖文章链接 -->
            <router-link to="#" class="article-link">
                <!-- 跟帖评论原文 -->
                <p>
                    原文：{{ item.post.title }}
                </p>
                <!-- 右字体箭头 -->
                <span class="iconfont iconjiantou1"></span>
            </router-link>
        </div>
    </div>
</template>


<script>
// 导入 我的跟帖页面 实例
import config from "./UserComment";

// 导出 我的跟帖页面 实例
export default config;
</script>


<style scoped lang="less">
// 导入 我的跟帖页面 样式    
@import url("./UserComment.less");
</style>
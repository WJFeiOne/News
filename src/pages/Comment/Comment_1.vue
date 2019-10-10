<script>/* 评论跟帖页面 组件*/</script>


<template>
    <!-- 评论跟帖组件布局 -->
    <div class="container">
        <!-- 调用板块头部组件 -->
        <HeaderNormal title="精彩跟帖" />

        <!-- 评论模块 v-model：是否在加载 finished：是否加载完毕 load：到底部触发加载-->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
            <!-- 循环遍历评论列表 -->
            <div class="comment" v-for="(item, index) in comments" :key="index">
                <!-- 评论详情 -->
                <div class="comment-info">
                    <!-- 左侧用户信息 -->
                    <div class="comment-user">
                        <!-- 用户头像 有头像显示-->
                        <img :src="$axios.defaults.baseURL + item.user.head_img" v-if="item.user.head_img"/>
                        <!-- 用户头像 没有头像显示-->
                        <img src="../../../static/default_green.jpg" v-else />
                        <!-- 用户信息-->
                        <div class="user-info">
                            <!-- 用户昵称-->
                            <p>{{item.user.nickname}}</p>
                            <!-- 发布时间-->
                            <span>2小时前</span>
                        </div>
                    </div>
        
                    <!-- 回复评论按钮 -->
                    <span class="reply" @click="handleReply(item)">回复</span>
                </div>
             
                <!-- 评论渲染组件 -->
                <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply" />
                <!-- 回复评论内容 -->
                <div class="comment-content">{{item.content}}</div>
            </div>
        </van-list>

        <!-- 调用页脚组件 post文章的详情 replyComment：要回复的评论 getComments：发布评论成功后重新请求评论的列表-->
        <PostFooter :post="detail" :replyComment="replyComment" @handleReply="handleReply" @getComments="getComments"/>
    </div>
</template>

<script>
// 导入 评论跟帖 组件实例
import config from "./Comment";
// 导出 评论跟帖 组件实例
export default config;
</script>

<style scoped lang="less">
// 导入 评论跟帖 样式
@import url("./Comment.less");
</style>
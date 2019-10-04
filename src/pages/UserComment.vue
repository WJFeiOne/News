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
// 导入 板块头部组件
import HeaderNormal from "@/components/HeaderNormal";

// 我的跟帖 组件实例
export default {
    // 指定 我的跟帖 数据
    data(){
        // 返回 我的跟帖 数据
        return {
            list: []  //接收 评论列表 数据
        }
    },

    // 注册组件
    components: {
        HeaderNormal  // 注册 板块头部组件
    },

    // 组件 加载完成 执行
    mounted(){
        // 发送 请求数据
        this.$axios({
            url: "/user_comments",   // 请求 我的跟帖 数据接口
            headers: {
                Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
            }
        }).then(res => {
            const {data} = res.data;  // 解构 响应数据 data
            this.list = data;         // 将数据赋值给 评论列表
        })
    }
};
</script>

<style scoped lang="less">
// 我的跟帖组件样式
.comment-item{
    padding: 10 / 360 * 100vw;
    font-size: 14 / 360 * 100vw;
    line-height: 1.8;
    border-bottom:1 / 360 * 100vw #ccc solid;
    // 评论时间样式
    .time{
        font-size: 12 / 360 * 100vw;
        color:#999;
        margin-bottom: 5 / 360 * 100vw;
    }
    // 回复评论样式
    .parent{
        background:#eee;
        padding: 10 / 360 * 100vw;
        margin-bottom: 5 / 360 * 100vw;
        .parent-title{  // 评论昵称样式
            font-size: 12 / 360 * 100vw;
            color:#999;
        }
    }
    // 评论内容样式
    .content{
        margin-bottom: 5 / 360 * 100vw;
    }
    // 跟帖文章链接样式
    .article-link{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12 / 360 * 100vw;
        color:#999;
        p{  // 跟帖原文样式
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
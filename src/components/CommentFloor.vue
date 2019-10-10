<script>/* 公共 评论渲染 组件 */</script>


<template>
    <div>
        <!-- 评论自调用组件 -->
        <comment v-if="data.parent" :data="data.parent" @handleReply="handleReply"></comment>

        <!-- 评论楼层 -->
        <div class="comment-floor">
            <!-- 评论用户信息 -->
            <div class="floor-header">
                <!-- 用户昵称-->
                <span>{{data.user.nickname}}</span>
                <!-- 发布时间-->
                <i>2小时前</i>
                <!-- 回复评论按钮 -->
                <em @click="handleReply">回复</em>
            </div>
            <!-- 回复评论内容 -->
            <div class="comment-content">{{data.content}}</div>
        </div>
    </div>
</template>

<script>
// 评论渲染 组件实例
export default {
    // 定义 回调组件 别名
    name: "comment",
    // 指定 组件接收的参数
    props: ["data"],
    // 指定 组件事件
    methods: {
        // 点击 回复评论
        handleReply() {
            // 触发父组件事件 传入回复参数
            this.$emit("handleReply", this.data);
        }
    }
};
</script>

<style scoped lang="less">
// 评论渲染 组件样式
.comment-floor {
    border: 1px #ccc solid;
    padding: 10px;
    background: #f6f6f6;
    // 用户信息样式
    .floor-header {
        font-size: 13px;
        color: #666;
        // 发布时间样式
        i {
            font-size: 12px;
            color: #999;
        }
        // 回复按钮样式
        em {
            float: right;
        }
    }
}
// 评论楼层样式
.comment-floor:not(:first-child) {
    border-top: none;
}
</style>
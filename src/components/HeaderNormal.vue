<script>/* 公共 用户板块头部 组件*/</script>


<template>
    <!-- 用户板块 头部组件 -->
    <div class="header">
        <!-- 左字体箭头 -->
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <!-- 标题 -->
        <h4>{{title}}</h4>
        <!-- 右占位字体 -->
        <span>></span>
    </div>
</template>

<script>
// 用户板块 头部组件实例
export default {
    // 定义 组件接收的参数
    props: ["title"]
};
</script>

<style scoped lang="less">
// 板块头部样式
.header {
    height: 60 / 360 * 100vw;
    font-size: 16 / 360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {  // 左字体箭头样式
        display: block;
        padding: 0 10 / 360 * 100vw;
        font-size: 16 / 360 * 100vw;
    }
    span:last-child {  // 右占位字体样式
        opacity: 0;
    }
}
</style>
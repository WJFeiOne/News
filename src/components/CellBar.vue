<script>/* 公共 条形码 组件*/</script>


<template>
    <!-- 条形码组件 -->
    <div class="cell-wrap" @click="$emit('click', $event)">
        <div class="cell">
            <!-- 左侧内容 -->
            <span>{{label}}</span>
            <!-- 右侧内容 -->
            <i>{{text}}</i>
            <!-- 字体箭头 -->
            <span class="iconfont iconjiantou1"></span>
        </div>
    </div>
</template>


<script>
// 条形码组件实例
export default {
    // 定义 组件接收的参数
    props: ["label", "text"]
};
</script>


<style scoped lang="less">
// 条形码组件样式
.cell-wrap {
    padding-left: 10 / 360 * 100vw;
    .cell {  // 内容样式
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10 / 360 * 100vw;
        height: 48 / 360 * 100vw;
        font-size: 16 / 360 * 100vw;
        border-bottom: 1 / 360 * 100vw #eee solid;
        i {  // 右侧内容样式
            display: block;
            flex: 1;
            text-align: right;
            padding: 0 10 / 360 * 100vw;
            font-size: 14 / 360 * 100vw;
            color: #999;
        }
        span {  // 字体箭头样式
            font-size: 16 / 360 * 100vw;
        }
    }
}
</style>
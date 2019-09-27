<script>/* 项目入口 组件 */</script>


<template>
   <!-- 入口组件 -->
   <div>
        <!-- 入口组件占位 -->
        <router-view></router-view>
   </div>
</template>


<script>
// 导出 入口组件 参数
export default {
    // 指定 入口组件数据
    data(){
        // 返回 入口组件数据
        return {
        }
    }
}
</script>


<style>
/* 导入字体图标 */
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
/* 导入 Vant-UI 组件 */
@import url("../node_modules/vant/lib/index.css");

/* 公共样式 */
*{
    margin: 0;   /* 初始外边距 */
    padding: 0;  /* 初始外边距 */
}

a{
    color:inherit;  /* 标签继承父级元素颜色 */
}

a:hover{
    text-decoration: none;  /* 去除下划线样式 */
}

ul,li,ol{
    list-style: none,  /* 去除列表默认样式 */
}

i,em{
    font-style: normal,  /* 设置标签为正常字体 */
}
</style>
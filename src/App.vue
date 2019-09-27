<script>/* 项目入口 组件 */</script>


<template>
   <!-- 入口组件 -->
   <div class="colorRed">
      这是 项目入口 组件,
      <router-link to="/login">登录页</router-link>
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
    .colorRed{
    color:red  /* 设置字体颜色 */
   }
</style>
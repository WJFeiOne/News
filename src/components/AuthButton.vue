<script>/* 公共 按钮 组件*/</script>

<template>
  <!-- 按钮组件模板 -->
  <div class="button" @click="handleClick">{{text}}</div>
</template>

<script>
// 导出 按钮组件 参数
export default {
  // 指定 组件接收 的数据  
  props: ["text"],  // 指定按钮文字提示
  // 指定 组件事件
  methods: {
    // 每次 点击都会触发  
    handleClick(event) {
      this.$emit("click", event); // 返回 事件对象
    }
  }
};
</script>

<style scoped lang="less">
// 按钮样式
.button {
  width: 100%;
  height: 48 / 360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81e06;
  color: #fff;
  border-radius: 50px;
  font-size: 20/ 360 * 100vw;
  margin-top: 20px;
}
</style>
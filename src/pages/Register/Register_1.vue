<script>/* 注册页面 组件*/</script>


<template>
  <!-- 注册页面组件 -->
  <div class="container">
    <!-- 关闭页面按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- 页面 logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户注册 输入框 -->
    <div class="input">
      <!-- 用户名 输入框组件 -->
      <AuthInput
        placeholder="手机号码"
        :value="form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
      ></AuthInput>

      <!-- 用户昵称 输入框组件 -->
      <AuthInput
        placeholder="昵称"
        v-model="form.nickname"
        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="昵称格式不正确"
      ></AuthInput>

      <!-- 密码 输入框组件 -->
      <AuthInput
        placeholder="密码"
        type="password"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>
    </div>

    <!-- 登录提示 -->
    <p class="tips">
      有账号？
      <!-- 登录链接 -->
      <router-link to="/login">去登录</router-link>
    </p>

    <!-- 注册按钮 -->
    <AuthButton text="注册" @click="handleSubmit" />
  </div>
</template>


<script>
// 导入 注册页面 实例
import config from "./Register";

// 导出 注册页面 实例
export default config;
</script>


<style scoped lang="less">
// 导入 注册页面 样式    
@import url("./Register.less");
</style>
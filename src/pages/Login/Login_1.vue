<script>/* 登录页面 组件*/</script>


<template>
    <!-- 登录页面组件 -->
    <div class="container">

    <!-- 关闭页面按钮 -->
    <div class="close">
        <span class="iconfont iconicon-test"></span>
    </div>

    <!-- 页面logo -->
    <div class="logo">
        <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户登录输入框 -->
    <div class="input">

      <!-- 用户名输入框组件 -->
        <AuthInput
        placeholder="手机号码"   
        :value="form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
        ></AuthInput>

      <!-- 密码输入框组件 -->
      <AuthInput
        placeholder="密码"
        type="password"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>
    </div>

    <!-- 注册提示 -->
    <p class="tips">
      没有账号？
      <!-- 注册链接 -->
      <router-link to="/register">去注册</router-link>
    </p>

    <!-- 登录按钮 -->
    <AuthButton text="登录" @click="handleSubmit" />
    </div>
</template>

<script>
// 导入 登录页面 实例
import config from "./Login";

// 导出 登录页面 实例
export default config;
</script>


<style scoped lang="less">
// 导入 登录页面 样式    
@import url("./Login.less");
</style>
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
// 导入 输入框 组件
import AuthInput from "@/components/AuthInput";
// 导入 按钮 组件
import AuthButton from "@/components/AuthButton";
// 导入 请求库 文件
import axios from "axios";

// 登录页面组件实例
export default {
  // 指定 登录信息 数据
    data() {
        // 返回 登录信息 数据
        return {
        // 指定 登录表单 数据
        form: {
        username: "", // 接收 用户名
        password: ""  // 接收 用户密码
      }
    };
  },

  // 注册组件
    components: {
        AuthInput, // 注册 输入框组件
        AuthButton // 注册 按钮组件
  },

    // 指定 组件事件
    methods: {
        // 获取 表单数据
        handleUsername(value) {
        this.form.username = value; 
    },

    // 表单 提交 数据
    handleSubmit() {
        // 发送 请求数据
        this.$axios({
        url: "/login",   // 请求 数据 接口
        method: "POST",  // 请求 数据 方式
        data: this.form  // 请求 数据 参数
      }).then(res => {                     // 接收 数据响应 数据
        const {message, data} = res.data;  // 解构 请求状态 数据
        if (message === "登录成功") {       // 判断 请求状态是否成功 
          localStorage.setItem("token", data.token);      // 请求成功 把 token 保存到本地
          localStorage.setItem("user_id", data.user.id);  // 请求成功 把 用户id 保存到本地
          this.$router.push("/");                         // 请求成功 跳转到 新闻首页 页面
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
// 关闭按钮样式
.container {
  padding: 20/ 360 * 100vw;
  .close {
    span {
      font-size: 27 / 360 * 100vw;
    }
  }
}

// logo 样式
.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

// 输入框样式
.inputs {
  input {
    margin-bottom: 20 / 360 * 100vw;
  }
}

// 注册提示样式
.tips{
  text-align:right;
  margin-bottom: 20 / 360 * 100vw;
  font-size: 16/ 360 * 100vw;
  a{
  color: #3385ff;
 }
}
</style>
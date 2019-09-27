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
// 导入 输入框 组件
import AuthInput from "@/components/AuthInput";
// 导入 按钮 组件
import AuthButton from "@/components/AuthButton";

// 注册页面组件实例
export default {
  // 指定 注册信息 数据
  data() {
    // 返回 登录信息 数据
    return {
      // 指定 注册表单 数据
      form: {
        username: "", // 接收 用户名
        password: "", // 接收 用户密码
        nickname: "" // 接收 用户昵称
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
        url: "/register",  // 请求 数据 接口
        method: "POST",    // 请求 数据 方式
        data: this.form    // 请求 数据 参数
      }).then(res => {                    // 接收 数据响应 数据
        const { message } = res.data;     // 解构 请求状态 数据
        if (message === "注册成功") {      // 判断 请求状态是否成功 
          this.$router.push("/login");    // 请求成功 跳转到登录页
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

// 登录提示样式
.tips {
  text-align: right;
  margin-bottom: 20/ 360 * 100vw;
  font-size: 16/ 360 * 100vw;
  a {
    color: #3385ff;
  }
}
</style>
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
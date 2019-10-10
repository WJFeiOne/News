// 导入 条形组件
import CellBar from "@/components/CellBar";

// 个人中心 组件实例
export default {
    // 指定 个人中心 数据
    data() {
        // 返回 个人中心 数据
        return {
            // 接收 个人信息
            profile: {}
        };
    },

    // 注册 条形组件
    components: {
        CellBar
    },

    // 指定 组件事件
    methods: {
        //点击 退出登录
        handleLogout() {
            localStorage.removeItem("token");   // 清除本地的 token
            localStorage.removeItem("user_id"); // 清除本地的 用户id
            this.$router.replace("/login");     // replace 替换地址为登录页
        },
        // 点击 返回首页
        returnIndex(){
            this.$router.replace("/");          // replace 替换地址为新闻首页
        }
    },

    // 组件 加载完成 执行
    mounted() {
        // 发送 请求数据
        this.$axios({
            url: "/user/" + localStorage.getItem("user_id"), // 拼接 个人中心 接口
            headers: {
                Authorization: localStorage.getItem("token") // 添加请求头 token 参数
            }
        }).then(res => {
            const { data } = res.data; // 解构 响应数据 data

            // 判断是否有 响应数据
            if (data) {
                this.profile = data; // 保存 响应数据 data
                // 判断是否有 用户头像
                if (data.head_img) {
                    // 指定当前 用户头像
                    this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
                } else {
                    // 指定 默认头像
                    this.profile.head_img = "./static/default_green.jpg";
                }
            }
        });
    }
};
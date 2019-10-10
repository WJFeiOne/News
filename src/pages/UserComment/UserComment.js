// 导入 板块头部组件
import HeaderNormal from "@/components/HeaderNormal";

// 我的跟帖 组件实例
export default {
    // 指定 我的跟帖 数据
    data(){
        // 返回 我的跟帖 数据
        return {
            list: []  //接收 评论列表 数据
        }
    },

    // 注册组件
    components: {
        HeaderNormal  // 注册 板块头部组件
    },

    // 组件 加载完成 执行
    mounted(){
        // 发送 请求数据
        this.$axios({
            url: "/user_comments",   // 请求 我的跟帖 数据接口
            headers: {
                Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
            }
        }).then(res => {
            const {data} = res.data;  // 解构 响应数据 data
            this.list = data;         // 将数据赋值给 评论列表
        })
    }
};
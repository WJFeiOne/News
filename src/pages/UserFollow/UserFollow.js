// 导入 板块头部组件
import HeaderNormal from "@/components/HeaderNormal";

// 我的关注组件实例
export default {
    // 指定 我的关注 数据
    data(){
        // 返回 我的关注 数据
        return {
            list: []  //接收 关注列表 数据
        }
    },

    // 注册组件
    components: {
        HeaderNormal  // 注册 板块头部组件
    },

    // 指定 组件事件
    methods: {
        // 点击 取消关注
        handelCancel(index){
            // 获取要 取消关注 的用户id
            const id = this.list[index].id;
            // 发送 请求数据
            this.$axios({
                url: "/user_unfollow/" + id,  // 拼接 取消关注 数据接口
                headers: {
                    Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
                },
            }).then(res => {
                // 解构 响应数据 data
                const {message} = res.data;
                // 判断是否 取消关注 成功
                if(message === "取消关注成功"){
                    this.list.splice(index, 1);   // 删除 取消关注 的列表数据
                    this.$toast.success(message); // 弹出 取消关注 成提示
                }
            })
        }
    },

    // 组件 加载完成 执行
    mounted(){
        // 发送 请求数据
        this.$axios({
            url: "/user_follows",  // 请求 我的关注 数据接口
            headers: {
                Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
            },
        }).then(res => {
            // 解构 响应数据 data
            const {data} = res.data;
            // 将数据赋值给 关注列表
            this.list = data;
        })
    }
}
// 导入 页脚组件
import PostFooter from "@/components/PostFooter"

// 文章详情 组件实例
export default {
    // 指定 文章详情组件 数据
    data(){
        // 返回 文章详情组件 数据
        return {
            // 文章详情对象
            detail: {
                user: {} // 接收 用户信息 
            }
        }
    },

    // 注册组件
    components: {
        PostFooter  // 注册 页脚组件
    },
    
    // 指定 组件事件
    methods: {
        // 关注 当前作者
        handleFollow(){
            // 发送 关注作者 数据请求
            this.$axios({
                url: "/user_follows/" + this.detail.user.id,     // 请求 关注作者 数据接口
                headers: {
                    Authorization: localStorage.getItem("token") // 添加请求头 token 认证参数 
                }
            }).then(res => {
                const {message} = res.data;  // 解构 响应数据 data 
                // 判断是否 关注成功
                if(message === "关注成功"){               
                    this.detail.has_follow = true;  // 修改 关注按钮 的状态
                    this.$toast.success(message)    // 弹出 关注成功 提示窗
                }
            })
        },

        // 取消关注 
        handleUnfollow(){
            // 发送 关注作者 数据请求
            this.$axios({
                url: "/user_unfollow/" + this.detail.user.id,     // 请求 关注作者 数据接口
                headers: {
                    Authorization: localStorage.getItem("token") // 添加请求头 token 认证参数 
                }
            }).then(res => {
                const {message} = res.data;  // 解构 响应数据 data 

                // 判断是否 取消关注成功
                if(message === "取消关注成功"){              
                    this.detail.has_follow = false;  // 修改 关注按钮 的状态
                    this.$toast.success(message)     // 弹出 关注成功 提示窗
                }
            })
        },

        // 点赞 当前文章
        handleLike(){
            // 发送 点赞文章 数据请求
            this.$axios({
                url: "/post_like/" + this.detail.id,              // 请求 点赞文章 数据接口
                headers: {
                    Authorization: localStorage.getItem("token")  // 添加请求头 token 认证参数 
                }
            }).then(res => {
                // 解构 响应数据 data
                const {message} = res.data;

                // 判断是否 点赞是否成功
                if(message === "点赞成功"){
                    this.detail.has_like = true;  // 修改 点赞按钮 的状态
                    this.detail.like_length++;    // 修改 点赞数量 加一 
                }

                // 判断是否 取消点赞成功
                if(message === "取消成功"){                    
                    this.detail.has_like = false; // 修改关注的按钮的状态
                    this.detail.like_length--;    // 修改 点赞数量 减一 
                }

                // 弹出 响应提示窗
                this.$toast.success(message);     
            })
        },

        // 收藏 当前文章
        handleStar(){
            // 发送 收藏文章 数据请求
            this.$axios({
                url: "/post_star/" + this.detail.id,              // 请求 收藏文章 数据接口 
                headers: {
                    Authorization: localStorage.getItem("token")  // 添加请求头 token 认证参数 
                }
            }).then(res => {
                // 解构 响应数据 data
                const {message} = res.data;

                // 判断是否 收藏文章成功
                if(message === "收藏成功"){
                    this.detail.has_star = true;   // 修改 收藏按钮 的状态
                }

                // 判断是否 取消收藏成功
                if(message === "取消成功"){
                    this.detail.has_star = false;  // 修改 收藏按钮 的状态
                }

                // 弹出 响应提示窗
                this.$toast.success(message)   
        
            })
        }
    },

    // 组件 加载完成 执行
    mounted(){
        // 获取 请求文章详情 id
        const {id} = this.$route.params;
        // 获取 本地认证信息 token
        const token = localStorage.getItem("token");

        // 定义 请求参数
        const config = {
            url: "/post/" + id  // 请求 数据接口 参数
        }
        
        // 判断本地是否有 token
        if(token){
            // 添加 请求参数
            config.headers = {
                Authorization: token  // 请求 数据认证 参数
            }
        }

        // 发送 文章详情 数据请求
        this.$axios(config).then(res => {
            const {data} = res.data;  // 解构 响应数据 data 
            this.detail = data;       // 保存 到详情对象中
        })
    }
}

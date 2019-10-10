// 导入 板块头部 组件
import HeaderNormal from "@/components/HeaderNormal"
// 导入 评论渲染 组件
import CommentFloor from "@/components/CommentFloor"
// 导入 发布评论 组件
import PostFooter from "@/components/PostFooter"

// 评论跟帖页面 组件实例
export default {
    // 指定 评论跟帖 组件参数
    data(){
        // 返回 评论跟帖 组件参数
        return {
            comments: [],        // 接收 评论列表 数据
            detail: {},          // 接收 文章详情 数据
            replyComment: null,  // 接收 回复评论 数据
            loading: false,      // 接收 评论加载 状态
            finished: false,     // 接收 加载完成 状态
            pageIndex: 1,        // 接收 当前评论 页数
            pageSize: 10         // 接收 评论数据 总数
        }
    },

    // 注册组件
    components: {
        HeaderNormal,   // 注册 板块头部 组件
        CommentFloor,   // 注册 评论渲染 组件
        PostFooter      // 注册 发布评论 组件
    },

    // 指定 组件事件
    methods: {
        // 请求 评论列表数据
        getComments(id, isReply){

            // 判断 评论发布是否成功
            if(isReply === "isReply"){
                this.pageIndex = 1;  // 发布成功，初始化分页数据
                this.comments = []   // 初始化列表数据
            }

            // 请求 文章评论 列表
            this.$axios({
                // 请求 数据接口
                url: `/post_comment/${id}?pageIndex=${this.pageIndex}`,
            }).then(res => {
                const {data} = res.data;  // 解构 响应数据 data
                this.comments = [...this.comments, ...data];  // 解构覆盖 评论列表               
                this.loading = false;     // 显示 加载状态
                
                // 判断 评论数据是否 小于评论总数
                if(data.length < this.pageSize){
                    this.finished = true;  // 取消加载状态
                    return;                // 返回
                }

                // 评论页数加一
                this.pageIndex++;
            });
        },

        // 点击 回复按钮 时候触发
        handleReply(item){
            this.replyComment = item;  // 保存 当前要回复的 id
        },

        // 加载 更多评论 
        onLoad(){
            // 添加 定时请求
            setTimeout(() => {
                // 解构 当前文章跟帖 id
                const {id} = this.$route.params;
                // 调用请求 获取下一页数据
                this.getComments(id);
            }, 2000)
        }
    },

    // 组件加载完成 执行
    mounted(){
        const {id} = this.$route.params;  // 解构 当前文章跟帖 id
        this.getComments(id);             // 调用请求 获取评论列表数据

        // 定义 获取文章详情 的对象
        const config = {
            url: "/post/" + id  // 数据接口参数
        }

        // 获取本地 token 认证信息
        const token = localStorage.getItem("token");

        // 判断是否有 token 
        if(token){
            // 添加 token 认证信息
            config.headers = {
                Authorization: token  // token 认证信息
            }
        }

        // 发送请求 获取文章详情 数据
        this.$axios(config).then(res => {
            const {data} = res.data;  // 解构 响应数据 data
            this.detail = data;       // 保存 文章详情 数据
        })
    }
}

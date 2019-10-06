<script>/* 文章详情页面 组件*/</script>


<template>
  <!-- 文章详情组件 -->
  <div>
    <!-- 文章的详情页内容 -->
    <div class="article">
        <!-- 头部导航 -->
        <div class="header">
            <!-- 返回上一页 -->
            <div class="header-left" @click="$router.back()">
                <!-- 字体箭头 -->
                <span class="iconfont iconjiantou2"></span>
                <!-- logo 图标 -->
                <span class="iconfont iconnew"></span>
            </div>
            <!-- 关注按钮 -->
            <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
            <!-- 取消关注按钮 -->
            <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
        </div>
        <!-- 文章标题 -->
        <h3>{{ detail.title }}</h3>
        <!-- 作者信息 -->
        <p class="post-info">火星时报  2019-10-10</p>
        <!-- 文章内容 -->
        <div class="post-content" v-html="detail.content"></div>
    </div>
    <!-- 功能按钮 -->
    <div class="post-btns">
        <!-- 点赞按钮 -->
        <span @click="handleLike" :class="{ like_active:detail.has_like }">
            <!-- 点赞图标 -->
            <i class="iconfont icondianzan"></i>
            <!-- 点赞数量 -->
            {{detail.like_length}}
        </span>
        <!-- 分享按钮 -->
        <span>
            <!-- 分享图标 -->
            <i class="iconfont iconweixin"></i>
            微信
        </span>
    </div>
    <!-- 页脚评论组件 -->
    <PostFooter :post="detail" @handleStar="handleStar"/>
  </div>
</template>


<script>
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

</script>


<style scoped lang="less">
// 文章组件样式
.article{
    padding:0 10 / 360 * 100vw;
    padding-top:60 / 360 * 100vw;
    // 头部导航样式
    .header{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height:60 / 360 * 100vw;
        padding:0 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:#fff;
        // 返回上一页样式
        .header-left{
            *{
                vertical-align: middle;
            }
        }
        // 字体箭头样式
        .iconjiantou2{
            font-size:16 / 360 * 100vw;
        }
        // logo 图标样式
        .iconnew{
            font-size:50 / 360 * 100vw;    
        }
        // 关注按钮样式
        .focus{
            width:62 / 360 * 100vw;
            height: 26 / 360 * 100vw;
            line-height: 26 / 360 * 100vw;
            text-align: center;
            font-size:12 / 360 * 100vw;
            background:red;
            color:#fff;
            border-radius: 100 / 360 * 100vw;
        }
        // 取消关注按钮样式
        .focus_active{
            border: 1px #ccc solid;
            color:#333;
            background:none;
        }
    }
    // 文章标题样式
    h3{
        font-size:16 / 360 * 100vw;
        margin-bottom:5 / 360 * 100vw;
    }
    // 作者信息样式
    .post-info{
        font-size: 12 / 360 * 100vw;
        color:#999;
        margin-bottom:10 / 360 * 100vw;
    }
    // 文章内容样式
    .post-content{
        font-size:14 / 360 * 100vw;
        line-height: 1.5;
        // 第三方 文章图片样式
        /deep/ img{
            max-width: 100%; 
        }
    }
}

// 功能按钮样式
.post-btns{
    margin-top:30 / 360 * 100vw;
    display: flex;
    justify-content: space-around;
    // 按钮样式
    span{
        padding: 0 15 / 360 * 100vw;
        height: 30 / 360 * 100vw;
        line-height: 30 / 360 * 100vw;
        font-size:12 / 360 * 100vw;
        border: 1px #ddd solid;
        border-radius: 50 / 360 * 100vw;
    }
    // 点赞按钮样式
    .icondianzan{
        font-size:16 / 360 * 100vw; 
    }
    // 取消点赞按钮样式
    .like_active{
        border: 1px  red solid;
            i{
                color:red;
            }
    }
    // 分享按钮样式
    .iconweixin{
        color: #07c907;
        font-size:16 / 360 * 100vw;
    }

}
</style>
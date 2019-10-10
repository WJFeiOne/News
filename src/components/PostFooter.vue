<script>/* 公共 发布评论 组件 */</script>


<template>
     <!-- 发布评论 组件布局 -->
    <div class="footer-wrap">
        <!-- 普通页脚 -->
        <div class="footer" v-show="!isFocus">
            <!-- 评论输入框 -->
            <input type="text" placeholder="写跟帖" @focus="handleFocus">
            
            <!-- 跳转到评论页面 -->
            <!-- <router-link :to="`/post_comment/${post.id}`">
                <!-- 评论样式 -->
                <!-- <span class="comment"> -->
                    <!-- 评论数量 -->
                    <!-- <em>{{post.comment_length}}</em> -->
                    <!-- 评论图标 -->
                    <!-- <i class="iconfont iconpinglun-"></i> -->
                <!-- </span> -->
            <!-- </router-link>  -->

            <!-- 跳转到评论页面 用事件的方式跳转并且带上参数 -->
            <span class="comment" @click="$router.push(`/post_comment/${post.id}`)">
                <!-- 评论数量 -->
                <em>{{post.comment_length}}</em>
                <!-- 评论图标 -->
                <i class="iconfont iconpinglun-"></i>
            </span>

            <!-- 收藏按钮图标 -->
            <i class="iconfont iconshoucang" :class="{ star_active: post.has_star }" @click="$emit('handleStar')"></i>
            <!-- 分享按钮图标 -->
            <i class="iconfont iconfenxiang"></i>
        </div>

        <!-- 输入评论页脚, v-show:显示隐藏,获得textare的dom元素 -->
        <div class="footer-comment" v-show="isFocus">
            <!-- 评论文本输入框 -->
            <textarea rows="3" ref="textarea" v-model="value" :placeholder="placeholder" @blur="handleBlur" :autofocus="isFocus">
            </textarea>
            <!-- 发送按钮 -->
            <span @click="handleSubmit">发送</span>
        </div>
    </div>
</template>


<script>
// 发布评论 组件实例
export default {
    // 指定 发布评论 组件参数
    data(){
        // 返回 发布评论 组件参数
        return {
            isFocus: false,        // 接收 获得焦点 状态
            value: "",             // 接收 评论内容 数据
            placeholder: "写跟帖",  // 接收 提示文字 参数
        }
    },

    
    // 指定 组件接收的参数 replyComment 要回复的评论
    props: ["post", "replyComment"],

    // 监听 组件数据
    watch: {
        // 监听 回复评论数据
        replyComment(){
            // 判断 是否点击了回复
            if(this.replyComment){
                // 评论输入框 获得焦点
                this.isFocus = true;
                // 显示 @ 回复信息
                this.placeholder = '@' + this.replyComment.user.nickname;
            }
        }
    },

    // 指定 组件事件
    methods: {
        // 输入框 获得焦点 时候触发
        handleFocus(){
            // 输入框 获得焦点
            this.isFocus = true;
        },

        // 输入框 失去焦点 时候触发
        handleBlur(){
            // 判断 输入框是否有数据
            if(!this.value){
                this.isFocus = false;  // 输入框 失去焦点
                // 判断 输入框有回复数据
                if(this.replyComment){
                    this.$emit("handleReply", null); // 清空 回复数据
                    this.placeholder = "写跟帖"  // 显示 输入框提示
                } 
            }           
        },

        // 点击发布 回复评论
        handleSubmit(){
            // 判断输入框 是否有数据
            if(!this.value){
                return;  // 没有返回
            }

            // 定义 回复评论 对象
            const data = {
                content: this.value  // 回复评论 参数
            }

            // 判断是否有回复评论
            if(this.replyComment){
                data.parent_id = this.replyComment.id;  // 添加 当前回复 id 
            }

            // 请求 回复评论 数据
            this.$axios({
                // 请求 数据接口
                url: "/post_comment/" + this.post.id,
                // 请求 数据接口
                method: "POST",
                headers: {  // 添加 token 请求头信息
                    Authorization: localStorage.getItem("token") // 获取本地 token 
                },
                data  // 请求 数据参数
            }).then(res => {
                // 解构 响应数据 data
                const {message} = res.data;
                // 判断 回复评论 是否成功
                if(message === "评论发布成功"){
                    // 触发父组件 方法更新评论列表
                    this.$emit("getComments", this.post.id, "isReply");
                    this.isFocus = false;  // 隐藏 输入框
                    this.value = "";       // 清空 输入框的值
                    window.scrollTo(0, 0); // 滚动 到底部
                }
            })
        }
    }
}
</script>


<style scoped lang="less">
// 文章详情页脚组件样式
.footer-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    width:100%;
    border-top:1px #eee solid;
    padding: 0 10px;
    box-sizing: border-box;
    background:#fff;
}

// 普通页脚样式
.footer {
    height: 60 / 360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    // 输入框样式
    input {
        width: 40%;
        height: 36 / 360 * 100vw;
        background: #eee;
        border: none;
        font-size: 12 / 360 * 100vw;
        padding: 0 15 / 360 * 100vw;
        border-radius: 50 / 360 * 100vw;
    }
    // 评论数量样式
    .comment {
        display: block;
        position: relative;
        // 数量样式
        em {
            position: absolute;
            display: block;
            background: red;
            border-radius: 50 / 360 * 100vw;
            color: #fff;
            padding: 0 5 / 360 * 100vw;
            font-size: 10 / 360 * 100vw;
            height: 14 / 360 * 100vw;
            line-height: 14 / 360 * 100vw;
            left: 0;
            top: -5 / 360 * 100vw;
        }
    }
    // 字体图标样式
    .iconfont {
        font-size: 24 / 360 * 100vw;
    }
    // 收藏成功按钮样式
    .star_active{
        color:red;
    }
}

// 输入评论页脚样式
.footer-comment {
    padding: 10 / 360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    // 文本输入框样式
    textarea {
        width: 260 / 360 * 100vw;
        background: #eee;
        padding: 10 / 360 * 100vw;
        box-sizing: border-box;
        border: none;
        border-radius: 8 / 360 * 100vw;
        resize: none;
    }
    // 发送按钮样式
    span {
        font-size: 12 / 360 * 100vw;
        background: red;
        width: 60 / 360 * 100vw;
        height: 26 / 360 * 100vw;
        line-height: 26 / 360 * 100vw;
        color: #fff;
        text-align: center;
        cursor:pointer;
        border-radius: 50 / 360 * 100vw;
    }
}
</style>
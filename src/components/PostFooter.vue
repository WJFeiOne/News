<script>/* 公共 文章详情页脚 组件*/</script>


<template>
    <!-- 文章详情页脚组件 -->
    <div class="footer-wrap">
        <!-- 普通页脚 -->
        <div class="footer" v-show="!isFocus">
            <!-- 评论输入框 -->
            <input type="text" placeholder="写跟帖" @focus="handleFocus">
            <!-- 评论数量 -->
            <span class="comment">
                <em>{{post.comment_length}}</em>
                <!-- 评论字体图标 -->
                <i class="iconfont iconpinglun-"></i>
            </span>
            <!-- 收藏按钮图标 -->
            <i class="iconfont iconshoucang" :class="{ star_active: post.has_star }" @click="$emit('handleStar')"></i>
            <!-- 分享按钮图标 -->
            <i class="iconfont iconfenxiang"></i>
        </div>

        <!-- 输入评论页脚 -->
        <div class="footer-comment" v-show="isFocus">
            <!-- 评论文本输入框 -->
            <textarea rows="3" ref="textarea" @blur="isFocus = false" :autofocus="isFocus" ></textarea>
            <!-- 发送按钮 -->
            <span>发送</span>
        </div>
    </div>
</template>


<script>
// 文章详情页脚 组件实例
export default {
    // 接受文章的详情
    props: ["post"],
    // 指定 文章详情页脚 数据
    data() {
        // 返回 文章详情页脚 数据
        return {
            isFocus: false  // 接收  输入框是否获得焦点状态
        };
    },

    // 指定 组件事件
    methods: {
        // 获得焦点 时候触发
        handleFocus() {
            // 文本输入框 获得焦点
            this.isFocus = true;
        }
    }
};
</script>


<style scoped lang="less">
// 文章详情页脚组件样式
.footer-wrap {
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1 / 360 * 100vw #eee solid;
    padding: 0 10 / 360 * 100vw;
    margin-top: 100 / 360 * 100vw;
    box-sizing: border-box;
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
        border-radius: 50 / 360 * 100vw;
    }
}
</style>
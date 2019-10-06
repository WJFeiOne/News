<script>/*公共 文章模块 组件*/</script>


<template>
    <!-- 文章模块 组件 -->
    <div>
        <!-- 单张图片显示布局组件 -->
        <div class="card" v-if="post.cover.length > 0 && post.cover.length < 3 && post.type === 1">
            <!-- 左侧文字 -->
            <div class="card-left">
                <!-- 文章标题 -->
                <div class="post-title">{{post.title}}</div>
                <p class="post-info">
                    <!-- 作者昵称 -->
                    <span>{{post.user.nickname}}</span>
                    <!-- 评论跟帖 -->
                    <span>{{post.comment_length}}跟帖</span>
                </p>
            </div>
            <div class="card-img">
                <!-- 文章图片 -->
                <img :src="post.cover[0].url" alt />
            </div>
        </div>

        <!-- 多张图片显示布局组件 -->
        <div class="img-cart" v-if="post.cover.length >= 3">
            <!-- 文章标题 -->
            <div class="post-title">{{post.title}}</div>
            <!-- 文章图片 -->
            <div class="img-list">
                <img v-for="(item, index) in post.cover" :key="index" :src="item.url" v-if="index < 3" />
            </div>
            <p class="post-info">
                <!-- 作者昵称 -->
                <span>{{post.user.nickname}}</span>
                <!-- 评论跟帖 -->
                <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>

        <!-- 视频显示布局组件 -->
        <div class="video-cart" v-if="post.type === 2 && post.cover.length === 1">
            <!-- 视频标题 -->
            <div class="post-title">{{post.title}}</div>
            <!-- 视频内容链接 -->
            <div class="video">
                <img :src="post.cover[0].url" alt />
                <span class="video-layer">
                    <!-- 视频播放按钮字体图标 -->
                    <i class="iconfont iconshipin"></i>
                </span>
            </div>
            <p class="post-info">
                <!-- 作者昵称 -->
                <span>{{post.user.nickname}}</span>
                <!-- 评论跟帖 -->
                <span>{{post.comment_length}}跟帖</span>
            </p>
        </div>
    </div>
</template>


<script>
// 文章模块 组件实例
export default {
    // 指定 组件接收的参数
    props: ["post"]
};
</script>


<style scoped lang="less">
// 单张图片布局样式
.card {
    padding: 10 / 360 * 100vw 10 / 360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1 / 360 * 100vw #ccc solid;
    // 左侧文字样式
    .card-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80 / 360 * 100vw;
        // 文章标题样式
        .post-title {
            font-size: 14 / 360 * 100vw;
            line-height: 1.5;
            margin-bottom: 5 / 360 * 100vw;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        // 作者信息样式
        .post-info {
            font-size: 12 / 360 * 100vw;
            color: #999;
        }
    }
    // 文章图片样式
    .card-img {
        img {
            display: block;
            width: 120 / 360 * 100vw;
            height: 80 / 360 * 100vw;
            object-fit: cover;
        }
    }
}

// 多张图片布局样式
.img-cart {
    padding: 10 / 360 * 100vw 10 / 360 * 100vw;
    border-bottom: 1 / 360 * 100vw #ccc solid;
    // 文章标题样式
    .post-title {
        font-size: 14 / 360 * 100vw;
        line-height: 1.5;
        margin-bottom: 5 / 360 * 100vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    // 文章图片列表样式
    .img-list {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5 / 360 * 100vw;
        // 文章图片样式
        img {
            display: block;
            width: 33%;
            height: 80 / 360 * 100vw;
            object-fit: cover;
        }
    }
    // 作者信息样式
    .post-info {
        font-size: 12 / 360 * 100vw;
        color: #999;
    }
}

// 视频布局样式
.video-cart {
    padding: 10 / 360 * 100vw 10 / 360 * 100vw;
    border-bottom: 1 / 360 * 100vw #ccc solid;
    // 视频标题样式
    .post-title {
        font-size: 14 / 360 * 100vw;
        line-height: 1.5;
        margin-bottom: 5 / 360 * 100vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    // 视频内容链接样式
    .video {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 5 / 360 * 100vw;
        // 视频封面样式
        img {
            display: block;
            width: 100%;
            height: 170 / 360 * 100 vw;
        }
        // 视频播放样式
        .video-layer {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            width: 46 / 360 * 100vw;
            height: 46 / 360 * 100vw;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            // 视频播放按钮样式
            i {
                color: #fff;
                font-size: 30 / 360 * 100vw;
            }
        }
    }
    // 作者信息样式
    .post-info {
        font-size: 12 / 360 * 100vw;
        color: #999;
    }
}
</style>
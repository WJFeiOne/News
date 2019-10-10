<script>/* 文章详情页面 组件*/</script>


<template>
  <!-- 文章详情组件 -->
  <div>
    <!-- 文章的详情页内容 -->
    <div class="article" v-if="detail.type === 1">
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
    <!-- 视频的详情内容 -->
    <div class="video-wrap" v-if="detail.type === 2">
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
        <!-- 视频标题 -->
        <h3>{{ detail.title }}</h3>
        <!-- 播放详情 -->
        <div class="video-info">
            <!-- 作者信息 -->
            <div class="video-user">
                <!-- 作者头像 -->
                <img :src="$axios.defaults.baseURL + detail.user.head_img" >
                <!-- 作者昵称 -->
                <span>{{detail.user.nickname}}</span>
            </div>
        </div>
        <!-- 视频播放器功能 -->
        <video 
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607446-14434032_adpkg-ad_hd.mp4"
        class="video"
        controls
        poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
        ></video>
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
            <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
        </span>
    </div>
    <!-- 页脚评论组件 -->
    <PostFooter :post="detail" @handleStar="handleStar"/>
  </div>
</template>


<script>
// 导入 文章详情 实例
import config from "./PostDetail";

// 导出 文章详情 实例
export default config;
</script>


<style scoped lang="less">
// 导入 文章详情 样式    
@import url("./PostDetail.less");
</style>
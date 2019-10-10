<script>/* 我的关注页面 组件*/</script>


<template>
    <!-- 我的关注组件 -->
    <div>
        <!-- 调用板块头部组件 -->
        <HeaderNormal title="我的关注"/>

        <!-- 关注用户列表 -->
        <!-- :key="index"为给for每一个循环的元素打上一个标识，方便页面的数据刷新 -->
        <div class="follow-item" v-for="(item, index) in list" :key="index">
            <!-- 关注用户头像 -->
            <img :src=" $axios.defaults.baseURL + item.head_img " alt="">

            <!-- 关注用户信息 -->
            <div class="item-center">
                <p>{{item.nickname}}</p>
                <!-- 关注时间 -->
                <span>2019-9-25</span>
            </div>

            <!-- 取消关注 -->
            <span class="cancel" @click="handelCancel(index)">取消关注</span>
        </div>
    </div>
</template>


<script>
// 导入 我的关注页面 实例
import config from "./UserFollow";

// 导出 我的关注页面 实例
export default config;
</script>


<style scoped lang="less">
// 导入 我的关注页面 样式    
@import url("./UserFollow.less");
</style>
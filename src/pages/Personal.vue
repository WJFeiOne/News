<script>/* 个人中心 组件 */</script>


<template>
    <!-- 个人中心组件 -->
    <div>
        <!-- 添加 点击跳转到 编辑页面 -->
        <router-link to="/edit_profile">
        <div class="profile">
            <!-- 用户头像 -->
            <img :src="profile.head_img" alt />
            <div class="profile-center">
                <!-- 用户昵称 -->
                <div class="name">
                    <span class="iconfont iconxingbienan"></span>
                    {{profile.nickname}}
                </div>
                <!-- 注册时间 -->
                <div class="time">2019-9-24</div>
            </div>
            <!-- 字体箭头 -->
            <span class="iconfont iconjiantou1"></span>
        </div>
        </router-link>
        <!-- 调用条形组件 添加我的关注组件-->
        <router-link to="/user_follow">
            <CellBar label="我的关注" text="关注的用户"/>
        </router-link>

        <!-- 调用条形组件 添加我的跟帖组件-->
        <router-link to="/user_comment">
            <CellBar label="我的跟帖" text="跟帖/回复"/>
        </router-link>

        <!-- 调用条形组件 -->
        <CellBar label="我的收藏" text="文章/视频" />

        <!-- 调用条形组件 -->
        <CellBar label="返回首页" text="" @click="returnIndex" />

        <!-- 退出登录 -->
        <span class="handleLogout" @click="handleLogout">退出</span>
    </div>
</template>


<script>
// 导入 条形组件
import CellBar from "@/components/CellBar";

// 个人中心 组件实例
export default {
    // 指定 个人中心 数据
    data() {
        // 返回 个人中心 数据
        return {
            // 接收 个人信息
            profile: {}
        };
    },

    // 注册 条形组件
    components: {
        CellBar
    },

    // 指定 组件事件
    methods: {
        //点击 退出登录
        handleLogout() {
            localStorage.removeItem("token");   // 清除本地的 token
            localStorage.removeItem("user_id"); // 清除本地的 用户id
            this.$router.replace("/login");     // replace 替换地址为登录页
        },
        // 点击 返回首页
        returnIndex(){
            this.$router.replace("/");          // replace 替换地址为新闻首页
        }
    },

    // 组件 加载完成 执行
    mounted() {
        // 发送 请求数据
        this.$axios({
            url: "/user/" + localStorage.getItem("user_id"), // 拼接 个人中心 接口
            headers: {
                Authorization: localStorage.getItem("token") // 添加请求头 token 参数
            }
        }).then(res => {
            const { data } = res.data; // 解构 响应数据 data

            // 判断是否有 响应数据
            if (data) {
                this.profile = data; // 保存 响应数据 data
                // 判断是否有 用户头像
                if (data.head_img) {
                    // 指定当前 用户头像
                    this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
                } else {
                    // 指定 默认头像
                    this.profile.head_img = "./static/default_green.jpg";
                }
            }
        });
    }
};
</script>


<style scoped lang="less">
// 组件布局样式
.profile {
    display: flex;
    padding: 20 / 360 * 100vw 10 / 360 * 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5 / 360 * 100vw #eee solid;
    img {  // 头像样式
        width: 70 / 360 * 100vw;
        height: 70 / 360 * 100vw;
        border-radius: 50%;
    }
    .profile-center {  // 详情样式
        flex: 1;
        padding: 0 10 / 360 * 100vw;
        .name {  // 昵称样式
            font-size: 16 / 360 * 100vw;
            span {
                color: #75b9eb;
                font-size: 16 / 360 * 100vw;
            }
        }
        .time {  // 时间样式
            color: #666;
            font-size: 14 / 360 * 100vw;
            margin-top: 5 / 360 * 100vw;
        }
    }
    span {  // 字体箭头样式
        font-size: 16 / 360 * 100vw;
    }
}
// 退出登录样式
.handleLogout{
    width: 90%;
    height: 13.33333333vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d81e06;
    color: #fff;
    border-radius: 50px;
    font-size: 5.55555556vw;
    margin: 20px auto;
}
</style>
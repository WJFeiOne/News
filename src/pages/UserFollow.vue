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
</script>


<style scoped lang="less">
    // 我的关注组件样式
    .follow-item{
        padding:20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #ccc solid;
        // 关注用户头像样式
        img{
            display: block;
            width: 60 / 360 * 100vw;
            height: 60 / 360 * 100vw;
            border-radius: 50%;
        }
        // 关注用户信息样式
        .item-center{
            flex:1;
            padding:0 10 / 360 * 100vw;
            font-size: 12 / 360 * 100vw;
            span{
                color:#999;
            }
        }
        // 取消关注样式
        .cancel{
            display: block;
            background: #ccc;
            padding: 0 10 / 360 * 100vw;
            height: 26 / 360 * 100vw;
            line-height: 26 / 360 * 100vw;
            font-size: 12 / 360 * 100vw;
            border-radius: 50 / 360 * 100vw;
        }
    }
</style>
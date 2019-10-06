<script>/* 新闻首页 组件*/</script>


<template>
    <!-- 新闻首页组件 -->
    <div>
        <!-- 头部搜索 -->
        <div class="header">
            <!-- 头部 logo -->
            <span class="iconfont iconnew logo"></span>
            <!-- 头部搜索链接 -->
            <div class="header-search">
                <!-- 搜索字体图标 -->
                <span class="iconfont iconsearch"></span>
                <!-- 输入框提示 -->
                <i>搜索新闻</i>
            </div>
            <!-- 个人中心链接 -->
            <router-link to="/personal">
                <!-- 个人中心字体图标 -->
                <span class="iconfont iconwode personal"></span>
            </router-link>
        </div>

        <!-- 第三方头部栏目组件 v-model: 默认选中的标签栏 sticky: 配置粘性布局 swipeable: 滑动切换-->
        <van-tabs v-model="active" sticky swipeable>
            <!-- 遍历栏目标题数据 -->
            <van-tab v-for="(item, index) in categories" :key="index" :title="item.name" >    
            <!-- 调用文章模块组件，遍历文章数据 v-model: 列表是否在加载 finished: 是否加载完毕 load: 到底部触发的事件 immediate-check 禁止list立即出发onload-->
            <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <!-- 文章模块组件，post是单篇文章详情 -->
                <PostCard v-for="(item, index) in item.posts" :key="index" :post="item"/>
            </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>


<script>
// 导入 文章模块 组件
import PostCard from "@/components/PostCard"

// 新闻首页 组件实例 
export default {
    // 指定 新闻首页 数据
    data(){
        // 返回 新闻首页 数据
        return {
            active: localStorage.getItem("token") ? 1 : 0,  // 接收栏目 默认选中状态参数
            categories: [],  // 接收栏目 列表数据
            cid: 999,        // 接收栏目 id
            pageIndex: 1,    // 第一次请求 接收分页变量           
            pageSize: 5,     // 第一次请求 接收每页加载条数
        }
    },

    // 注册组件
    components: {
        PostCard  // 注册 文章模块 组件
    },

    // 组件 加载完成 执行
    mounted(){
        // 定义 请求数据的对象
        const config = {
            url: "/category", // 栏目列表 数据接口
        }

        // 判断本地 是否存在 token
        if(localStorage.getItem("token")){
            // 添加请求数据 token 认证参数
            config.headers = {
                Authorization: localStorage.getItem("token")
            }
        }

       // 请求 栏目列表数据 传入请求对象
        this.$axios(config)
        .then(res => {
            const {data} = res.data; // 解构 响应数据 data
            const newData = [];      // 定义 文章列表 数组 

            // 循环 给栏目中每一项 都添加四个 独立的属性
            data.forEach(v => {
                v.posts = [];        // 接收 文章列表属性
                v.loading = false;   // 接收 列表是否在加载状态
                v.finished = false;  // 接收 列表是否加载完毕状态
                v.pageIndex = 1;     // 接收 分页变量参数  
                newData.push(v);     // 将新的数据 添加到 栏目列表 数组中 
            })
            this.categories = newData;  // 保存 栏目列表数据

            // 请求 文章列表数据
            this.$axios({
               url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}` // 文章列表 数据接口
            }).then(res => {
                const {data} = res.data;  // 解构 响应数据 data 
                this.categories[this.active].posts = data; // 保存 文章列表数据
                this.categories[this.active].pageIndex++;  // 文章 页数加一
            })
        });
    },

    // 指定 组件事件
    methods: {
        // 加载下一页 数据
        onLoad(){
            // 获取 自定义添加 的独立的属性
            const category = this.categories[this.active];
            // 请求 文章列表数据
            this.$axios({
                url: `/post?category=${this.cid}&pageIndex=${category.pageIndex}&pageSize=${this.pageSize}` // 文章列表 数据接口
            }).then(res => {
                const {data} = res.data;  // 解构 响应数据 data 
                // 判断 列表数据 是否已经全部加载
                if(data.length < this.pageSize){
                    category.finished = true;  // 用户提示 没有更多的数据了
                }
                // 将数据解构赋值 给文章列表
                category.posts = [...category.posts, ...data];
                // 文章页数 加一
                category.pageIndex++;
                // 加载已经完毕，可以继续加载 下一页数据
                category.loading = false;
            })
        }
    },

    // 监听 组件数据
    watch: {
        // 监听 栏目选中状态参数
        active(){
            // 获取滑动栏目的 id
            this.cid = this.categories[this.active].id;
            // 切换栏目时候 请求加载 栏目的数据
            this.onLoad();
        }
    }
};
</script>


<style scoped lang="less">
// 新闻首页组件样式
.header {
    height: 50 / 360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10 / 360 * 100vw;
    background: #f00;
    // 头部 logo 样式
    .logo {
        font-size: 50 / 360 * 100vw;
        color: #fff;
    }
    // 个人中心字体图标样式
    .personal {
        font-size: 22 / 360 * 100vw;
        color: #fff;
    }
    // 头部搜索链接样式
    .header-search {
        height: 34 / 360 * 100vw;
        background: rgba(255, 255, 255, 0.5);
        flex: 1;
        margin: 0 30 / 360 * 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 50 / 360 * 100vw;
        font-size: 14 / 360 * 100vw;
        span{
            font-size: 14 / 360 * 100vw;
        }
        i {
            margin-left: 5 / 360 * 100vw;
        }
    }
}

// 修改第三方栏目样式
/deep/ .van-tabs__nav{
    background:#f6f6f6;
    .van-tab {
        font-size:14 / 360 * 100vw;
        line-height:44 / 360 * 100vw;
    }
}

// 修改第三方栏目样式
/deep/ .van-tabs__line{
    width:40 / 360 * 100vw;
    height:1 / 360 * 100vw;
    margin-left: -2 / 360 * 100vw;
}

// 修改第三方栏目样式
/deep/ .van-tabs--line .van-tabs__wrap{
    height:44 / 360 * 100vw; 
}
</style>
// 导入 文章模块 组件
import PostCard from "@/components/PostCard";

// 搜索文章 组件实例 
export default {
    // 指定 组件别名
    name: "search",

    // 指定 搜索文章 数据
    data(){
        // 返回 搜索文章 数据
        return {
            keyword: "",  // 接收 搜索关键字 数据
            list: []      // 接收 文章的列表 数据
        }
    },
    
    // 注册组件
    components: {
        PostCard  // 注册 文章模块组件
    },

    // 指定 组件事件
    methods: {
        // 点击 处理搜索
        handleSearch(){
            // 请求 搜索文章 数据
            this.$axios({
                // 请求 数据接口
                url: `/post_search?keyword=${this.keyword}`
            }).then(res => {
               const {data} = res.data;  // 解构 响应数据 data
               this.list = data;         // 保存 文章搜索 数据
            })
        }
    },

    // 组件内的路由守卫，判断如果是首页进入到搜索页的，清空页面的缓存数据
    // to: 去哪里
    // from: 从哪里来
    // next: 函数，必须要调用，可以接受url的路径、函数，不传参数。
    beforeRouteEnter(to, from, next){
        // 判断 如果是从首页跳转进来
        if(from.path === "\/" ){
            // 在渲染该组件的对应路由被 confirm 前调用
            // 获取组件实例 `this`,需要在next的回调函数中获取
            // vm 就是组件的实例，也就是this
            next(vm => {
                vm.keyword = "";   // 清空 搜索关键字 数据
                vm.list = [];      // 清空 文章的列表 数据
            })

        }else{
            next();  // 其他 页面正常跳转
        }
    }
}

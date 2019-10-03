<script>/* 编辑资料页面 组件*/</script>


<template>
    <!-- 编辑资料组件 -->
    <div>
        <!-- 调用板块头部组件 -->
        <HeaderNormal title="编辑资料" />
        <!-- 头像 -->
        <div class="head">
            <img :src="profile.head_img" alt />
            <!-- vant 上传组件 -->
            <van-uploader :after-read="afterRead" class="uploader" />
        </div>
        <!-- 调用条形组件 添加昵称编辑弹窗-->
        <CellBar label="昵称" :text="profile.nickname" @click="show1 = !show1"/>

        <!-- 昵称编辑弹窗 -->
        <van-dialog v-model="show1" title="编辑昵称" show-cancel-button @confirm="handlNickname" >
        <!-- value 读取用户昵称 -->
        <van-field :value="profile.nickname" ref="nickname" placeholder="请输入新的昵称" />
        </van-dialog>

        <!-- 调用条形组件 添加密码编辑弹窗-->
        <CellBar label="密码" :text="profile.password" type="password" @click="show2 = !show2"/>

        <!-- 密码编辑弹窗 -->
        <van-dialog v-model="show2" title="编辑密码" show-cancel-button @confirm="handlPassword" >
        <!-- value 读取用户密码 -->
        <van-field :value="profile.password" placeholder="请输入新的密码" ref="password"/>
        </van-dialog>

        <!-- 调用条形组件 添加性别编辑弹窗-->
        <CellBar label="性别" :text="profile.gender === 1 ? '男' : '女'" @click="show3 = !show3"/>

        <!-- 性别编辑弹窗 -->
        <van-dialog v-model="show3" title="编辑性别" show-cancel-button @confirm="handlGender" >
            <van-radio-group v-model="genderCache">
                <van-cell-group>
                    <!-- 男 单选框 -->
                    <van-cell title="男" clickable @click="genderCache = '1'">
                        <van-radio slot="right-icon" name="1" />
                    </van-cell>
                    <!-- 女 单选框 -->
                    <van-cell title="女" clickable @click="genderCache = '0'">
                        <van-radio slot="right-icon" name="0" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-dialog>
    </div>
</template>


<script>
// 导入 板块头部组件
import HeaderNormal from "@/components/HeaderNormal";
// 导入 条形组件
import CellBar from "@/components/CellBar";

// 编辑资料 组件实例
export default {
    // 指定 编辑资料 数据
    data() {
        // 返回 编辑资料 数据
        return {
            profile: {},        // 接收 用户数据
            show1: false,       // 接收 昵称弹窗状态
            show2: false,       // 接收 密码弹窗状态
            show3: false,       // 接收 性别弹窗状态
            genderCache: '1',   // 接收 性别参数
        };
    },

    // 注册组件
    components: {
        HeaderNormal,   // 注册 板块头部组件
        CellBar         // 注册 条形组件
    },

    // 指定 组件事件
    methods: {
        // 编辑资料 数据接口函数
        editProfile(data, callback){
            // 判断是否有 请求参数
            if(!data) return;
            
            // 发送 请求数据
            this.$axios({
                url: `/user_update/` + localStorage.getItem("user_id"),  // 拼接 编辑资料 数据接口
                method: 'POST',  // 请求 编辑资料 数据方式
                headers: {
                    Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
                },
                data  // 请求 编辑资料 数据参数
            }).then(res => {
                const {message} = res.data;  // 解构 响应数据 data

                // 判断资料是否 编辑成功
                if(message === '修改成功'){
                    if(callback){
                        callback();   // 调用回调函数 
                    }
                    // 弹出编辑成功 提示信息
                    this.$toast.success(message);
                }
            })
        },

        // 上传用户头像 返回图片数据
        afterRead(file) {
            //构造 表单数据
            const formData = new FormData();
            // 通过表单使用 append 方法追加数据
            formData.append('file', file.file);

            // 发送 请求数据
            this.$axios({
                url: "/upload",  // 请求 上传头像 数据接口
                method: 'POST',  // 请求 上传头像 数据方式
                headers: {
                    Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
                },
                data: formData  // 请求 上传头像 数据参数
            }).then(res => {
                const {data} = res.data;  // 解构 响应数据 data
                this.profile.head_img = this.$axios.defaults.baseURL + data.url;  // 替换 用户头像
                this.editProfile({ head_img: data.url});  // 调用数据请求 传入参数
            })
        },

        // 编辑 昵称弹窗
        handlNickname(){
            // 拿到弹窗 input 输入框的值
            const value = this.$refs.nickname.$refs.input.value; 

            // 调用数据请求函数 传入参数
            this.editProfile({nickname: value}, () => {
                this.profile.nickname = value;  // 将 用户昵称 重新赋值
            });
        },

        // 编辑 密码弹窗
        handlPassword(){
            // 拿到弹窗 input 输入框的值
            const value = this.$refs.password.$refs.input.value;

            // 调用数据请求函数 传入参数
            this.editProfile({ password: value}, () => {
                this.profile.password = value;  // 将 用户密码 重新赋值
            });
        },

        // 编辑 性别弹窗
        handlGender(){
            // 把 性别参数 转换为数字
            const gender = +this.genderCache;  

            // 调用数据请求函数 传入参数
            this.editProfile({ gender}, () => {
                this.profile.gender = gender;  // 将 用户性别 重新赋值
            });
        }
    },

    // 组件 加载完成 执行
    mounted() {
        // 发送 请求数据
        this.$axios({
            url: "/user/" + localStorage.getItem("user_id"),  // 拼接 个人中心 数据接口
            headers: {
                Authorization: localStorage.getItem("token")  // 添加请求头 token 参数
            }
        }).then(res => {
            const { data } = res.data;  // 解构 响应数据 data

            // 判断是否有 响应数据
            if (data) {
                this.profile = data;  // 保存 响应数据 data
                
                // 把后台性别数据 转换成字符串 赋值给 genderCache
                this.genderCache = String(data.gender);

                // 判断是否有 用户头像
                if (data.head_img) {
                    this.profile.head_img =this.$axios.defaults.baseURL + data.head_img;  // 指定当前 用户头像
                } else {
                    this.profile.head_img = "./static/default_green.jpg";  // 指定 默认头像
                }
            }
        });
    }
};
</script>


<style scoped lang="less">
// 编辑资料组件样式
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20 / 360 * 100vw;
    position: relative;
    .uploader{  // 头像上传组件样式
      position: absolute;
      opacity: 0;
    }
    img {  // 头像样式
        display: block;
        width: 100 / 360 * 100vw;
        height: 100 / 360 * 100vw;
        border-radius: 50%;
    }
    // 修改第三方 上传表单组件样式
    /deep/ .van-uploader__upload{
        width: 100 / 360 * 100vw;
        height: 100 / 360 * 100vw;
    }
}
</style>
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
// 导入 编辑资料 实例
import config from "./EditProfile";

// 导出 编辑资料 实例
export default config;
</script>


<style scoped lang="less">
// 导入 编辑资料 样式    
@import url("./EditProfile.less");
</style>
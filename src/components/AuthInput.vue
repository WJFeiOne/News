<script>/* 公共 输入框 组件*/</script>

<template>
  <!-- 输入框组件模板 -->
  <input 
    class="input"                       
    :class="{
        success: status === 'success',
        error: status === 'error'
    }"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script>
// 导出 输入框组件 参数
export default {
    // 指定 组件数据
    data(){
        return {
            status: ""  // 接收 认证状态数据
        }
    },
    // 指定 组件接收 的数据
    props:[
        "placeholder",  // 指定 提示用户 的信息
        "value",        // 指定 用户输入 的数据
        "name",         // 指定 数据名称 
        "rule",         // 指定 正则认证
        "err_message"   // 指定 认证结果 的提示
    ],
    // 指定 组件事件
    methods: {

        // 每次输入框输入值时候都会触发
        handleInput(event){
            // 解构 接收 参数
            const {value} = event.target;

            // 判断 是否带有 正则认证
            if(this.rule){
                // 判断 正则认证 是否成功
                if( this.rule.test(value) ){ 
                    this.status = "success"; // 指定 认证成功 状态数据
                }else{
                    this.status = "error";  // 指定 认证失败 状态数据
                }
            }

            // 触发父组件的input事件，返回输入框的值
            this.$emit("input", value);
        },

        // 输入框失去焦点时候触发
        handleChange(){
            // 判断是否有提示信息 或 认证失败
            if(this.err_message && this.status === "error"){
                 this.$toast.fail(this.err_message)  // 调用 Vant-UI 插件方法返回提示
            }
        }
    }
}
</script>

<style scoped lang="less">
// 输入框样式
.input{
    width:100%;
    height: 38 / 360 * 100vw;
    padding:20/ 360 * 100vw 0;
    box-sizing: border-box;
    background: #fff;
    border:none;
    border-bottom: 2/ 360 * 100vw #666 solid;
    outline: none;
    font-size: 18/ 360 * 100vw;
}

// 表单认证错误样式
.success{
    border-bottom-color: blue;
}
// 表单认证成功样式
.error{
    border-bottom-color: red;
}
</style>
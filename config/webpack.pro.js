/* 
    加载 生产模式 配置模块
*/

// 导入 公共的配置
const base = require("./webpack.base");

// 合并 webpack 的配置
const merge = require("webpack-merge");

// merge 接受多个参数，把参数对象合并成，后面的对象 属性会覆前面的
module.exports = merge( base, {
    mode: "production",    // 声明当前是生产模式
})
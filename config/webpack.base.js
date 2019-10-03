/* 
    加载 项目公共 配置模块
*/

// 导入 path 路径处理模块
const path = require("path");

// 导入 提取样式 webpack 插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 导入 自动打包 dist 文件插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 导入 清除dist 目录插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 导入 vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 导入 复制文件夹 插件
const CopyPlugin = require("copy-webpack-plugin");


// webpack 的配置
module.exports = {

    // 文件入口配置
    entry: {
        main: "./src/main.js", // 入口文件路径
    },

    // 文件输出配置
    output: {
        path: path.resolve(__dirname, "../dist"), // 输出到 dist 文件夹
        filename: "js/[name].bundle.js" //  输出到 bundle.js 文件        
    },


    // 优化打包，提取出公共模块
    optimization: {
        splitChunks: {
            chunks: 'all' // 提取所有文件的共同数据
        }
    },

    // 模块解释
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src")  // 提供别名，方便查找模块的路径 
        },
        extensions: [".js", ".json", ".vue"]  // 添加 忽略扩展名
    },

    // 模块加载配置
    module: {
        // 配置规则
        rules: [
            // 处理 css 文件类型
            {
                test: /\.css$/,                        // 匹配 .css 结尾的文件
                use: ExtractTextPlugin.extract({       // 提取 css
                    fallback: "vue-style-loader",      // 把 css 代码写入到网页中
                    use: ["css-loader"]                // 读取 css 的代码
                })
            },
            // 处理 less 文件类型
            {
                test: /\.less$/,                        // 匹配 .less 结尾的文件
                use: ExtractTextPlugin.extract({        // 提取 less
                    fallback: "vue-style-loader",       // 把 css 代码写入到网页中
                    use: ["css-loader", "less-loader"]  // 读取 css 的代码 , 编译 less 文件
                })
            },

            // 匹配图片文件
            {
                test: /\.(png|svg|jpg|gif)$/,          // 匹配 图片格式 结尾的文件
                use: [{
                    loader: "file-loader",             // 处理图片文件返回链接
                    options: {
                        publicPath: "./images/",       // 引入图片时会在路径前面加上该选项
                        outputPath: "images"           // 输出到 dist 下的 images 目录
                    }
                }]
            },

            // 匹配 vue 的单文件组件
            {
                test: /\.vue$/,       // 匹配 .vue 结尾的文件 
                use: ['vue-loader']   // 编译  vue 代码
            },
        ]
    },

    // 加载插件程序
    plugins: [
        new ExtractTextPlugin('style/style.css'), // 提取到 dist 的 style 文件夹中

        new CleanWebpackPlugin(), // 调用清除打包目录插件                  

        new HtmlWebpackPlugin({
            template: "public/index.html" // template 指定默认 html 模板
        }),

        new VueLoaderPlugin(), // vue 加载器插件

        new CopyPlugin([
            { from: 'static', to: 'static' },  // 复制 static 文件夹到 dist 文件夹中 
        ]),
    ]

}
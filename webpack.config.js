const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const basePath = path.join(__dirname, "app");
const srcPath = path.join(basePath, "src");
const buildPath = path.join(basePath, "build");

module.exports = {
    entry: {
        app: ["webpack-dev-server/client?http://localhost:8080/", srcPath + "/app.js"],
        vendors: ["vue", "vue-router", "axios"]
    },
    output: {
        path: buildPath,
        filename: "[name].js",
        publicPath: "build/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel"],
                include: srcPath
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css", { publicPath: "../build/" })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass", { publicPath: "../build/" })
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract("style", "css!sass", { publicPath: "../build/" })
            },
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-otf"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ["file?hash=sha512&digest=hex&name=[hash].[ext]", "image-webpack?bypassOnDebug"]
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({ firebase: "firebase" }),
        new webpack.ProvidePlugin({ axios: "axios" })
        //new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ],
    resolve: {
        extensions: ["", ".js", ".vue", ".sass"],
        alias: {
            vue$: "vue/dist/vue.js"
        }
    },
    devtool: "sourcemap"
};

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: './main.js',
        modelViewer: './js/model-viewer/main.js',
        test: './js/interactive-examples/pages/co-je-threejs/main.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            chunks: ["main"],
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "3d-modely", "index.html"),
            filename: "3d-modely/index.html",
            chunks: ["main", "modelViewer"],
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "tutorial", "co-je-threejs", "index.html"),
            filename: "tutorial/co-je-threejs/index.html",
            chunks: ["main", "test"],
            inject: true
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "static").replace(/\\/g, "/"),
                    to: path.resolve(__dirname, "dist", "static"),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
}
// todo - později přidat handlebars
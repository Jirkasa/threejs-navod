const fs = require("fs");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


// READ FOLDERS FOR WITH INTERACTIVE EXAMPLES TO DETERMINE WHAT PAGES HAVE THEM OR NOT
const interactivePages = {};
fs.readdirSync("./js/interactive-examples/pages").forEach(pageName => {
    interactivePages[pageName] = true;
});

const htmlPluginsForTutorialPages = [];
const entriesForTutorialPages = {};

// CREATE PLUGINS FOR TUTORIAL PAGES
fs.readdirSync("./tutorial").forEach(pageName => {
    const chunks = ["main"];

    if (interactivePages[pageName]) {
        chunks.push(`interactiveExamples-${pageName}`);
        entriesForTutorialPages[`interactiveExamples-${pageName}`] = `./js/interactive-examples/pages/${pageName}/main.js`;
    }

    const htmlPlugin = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "tutorial", pageName, "index.ejs"),
        filename: `tutorial/${pageName}/index.html`,
        chunks: chunks,
        inject: true
    });

    htmlPluginsForTutorialPages.push(htmlPlugin);
});


module.exports = {
    entry: {
        main: './main.js',
        modelViewer: './js/model-viewer/main.js',
        // test: './js/interactive-examples/pages/co-je-threejs/main.js',
        ...entriesForTutorialPages
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "[name].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.ejs$/i,
                use: ['html-loader', 'template-ejs-loader']
            }
        ]
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
        ...htmlPluginsForTutorialPages,
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, "tutorial", "co-je-threejs", "index.ejs"),
        //     filename: "tutorial/co-je-threejs/index.html",
        //     chunks: ["main", "test"],
        //     inject: true
        // }),
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
// todo - přidat code splitting
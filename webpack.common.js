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
    const chunks = ["main", "stickyHeader"];

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
        stickyHeader: './js/sticky-header/main.js',
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
                use: [{
                    loader: 'html-loader',
                    options: {
                        sources: false
                    }
                }, 'template-ejs-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html"),
            chunks: ["main", "stickyHeader"],
            inject: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "3d-modely", "index.html"),
            filename: "3d-modely/index.html",
            chunks: ["main", "modelViewer"],
            inject: true
        }),
        ...htmlPluginsForTutorialPages,
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
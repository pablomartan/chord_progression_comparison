const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: './main.js',
        library: 'Client',
        libraryTarget: 'var'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: './src/client/html/prog_generator.html',
            filename: './prog_generator.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/client/html/prog_analyzer.html',
            filename: './prog_analyzer.html'
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}

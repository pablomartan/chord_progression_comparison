const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        library: 'Client',
        libraryTarget: 'var'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
       ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/html/index.html',
            filename: './index.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/client/html/prog_generator.html',
            filename: 'prog_generator.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/client/html/prog_analyzer.html',
            filename: 'prog_analyzer.html'
        }),

        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}

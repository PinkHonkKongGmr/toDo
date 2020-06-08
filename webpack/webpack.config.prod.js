const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    stats: 'errors-only',
    bail: true,
    output: {
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].js',
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
                },
            },
            {
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },

            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'sass-loader'],
            },
            {
                test: /\.css/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
});

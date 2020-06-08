const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        inline: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../src/index.html'),
            filename: `index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
        new StylelintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            quiet: true,
            emitErrors: true,
            files: '**/*.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                include: Path.resolve(__dirname, '../src'),
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react'),
                },
            },
            {
                test: /\.[tj]s$/,
                include: Path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                    failOnError: true,
                },
            },
            {
                test: /\.js$/,
                include: Path.resolve(__dirname, '../src'),
                loader: 'babel-loader',
            },

            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'sass-loader?sourceMap=true'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true'],
            },

            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
});

"use strict";

let webpack = require('webpack');
let CompressionPlugin = require('compression-webpack-plugin');

let options = {
    entry: {
        app: './src/entry/app'
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: "./public/"
    },
    output: {
        path: __dirname + '/public/js',
        publicPath: "/public/js",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js$/,
                include: [/whatwg-.*/],
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    }
};

if(process.env.NODE_ENV == 'production') {
    options.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};

module.exports = options;

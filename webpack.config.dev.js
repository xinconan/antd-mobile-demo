const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//svg
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  //path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
];

module.exports = {
    entry:{
        index: './source/react/home/home'
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: '[name].js',
        // chunkFilename: '[name].chunk.js',
        chunkFilename: '[name].js?v=[chunkhash:8]'
    },

    externals: {
        'jquery': '$',
        'fastclick': 'FastClick',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './source')
        ],
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ["transform-runtime", {polyfill: false}],
                                ["import", [{"style": "css", "libraryName": "antd-mobile"}]]
                            ],
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'postcss-loader'
                        ]
                    }
                )
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'postcss-loader',
                            'sass-loader'
                        ]
                    }
                )
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: ['url-loader?limit=8192']
            },
            {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                include: svgDirs
            },
            {
                test: /\.(eot|woff|ttf)$/,
                use: ['file-loader']
            }
        ],
    },

    
};
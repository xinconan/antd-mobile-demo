const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

//svg
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  //path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
];

// 参考：https://github.com/ant-design/antd-mobile-samples/blob/master/web-webpack2/webpack.config.js
// postcss
const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};

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
            // {
            //     test: /\.html$/,
            //     use: ['html-loader']
            // },
            // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            { loader: 'postcss-loader', options: postcssOpts }
                        ]
                    }
                )
            },
            {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            { loader: 'postcss-loader', options: postcssOpts },
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

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common'),
        new ExtractTextPlugin('[name].css'),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: [
        //             require('autoprefixer')({browsers: ['last 5 versions']}),
        //             require('postcss-pxtorem')({rootValue: 100, propWhiteList: []})
        //         ]
        //     }
        // }),
        new webpack.optimize.MinChunkSizePlugin({
            compress: {
                warnings: false
            }
        }),
        
        // new HtmlWebpackPlugin({
        //     filename:  path.resolve(__dirname, 'views/react/react_index.hbs'),
        //     template:  path.resolve(__dirname, 'views/react/react_template.hbs'),
        //     inject: 'body',
        //     hash: true,
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: false
        //     }
        // })
    ]
    
};
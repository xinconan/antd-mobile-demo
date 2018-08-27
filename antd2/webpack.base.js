const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const postConfig = {
	loader: require.resolve("postcss-loader"),
	options: {
		ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
		plugins: () => [
			require("postcss-flexbugs-fixes"),
			autoprefixer({
				browsers: ["iOS >= 7", "Android >= 4.1"],
				flexbox: "no-2009"
			}),
			pxtorem({ rootValue: 100, propWhiteList: [] })
		]
	}
};


module.exports = {
	entry: {
		bundle: [
			path.resolve(__dirname, "src/index")
		]
	},
	output: {
		path: path.join(__dirname, "public/build"),
		filename: "[name].js",
		chunkFilename: "[name].js?v=[chunkhash:8]"
	},
	externals: {
		fastclick: "FastClick",
		react: "React",
		"react-dom": "ReactDOM",
		"react-router": "ReactRouter",
	},
	resolve: {
		modules: [
			path.resolve(__dirname, "node_modules"),
			path.join(__dirname, "./src")
		],
		extensions: [".ts", ".tsx", ".web.js", ".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js[x]?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader", // 'babel-loader' is also a legal name to reference
				options: {
					plugins: [
						"transform-decorators-legacy",
						["transform-runtime", { polyfill: false }],
						["import", { libraryName: "antd-mobile", style: "css" }]
					],
					presets: ["env"]
				}
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
					"css-loader",
          postConfig,
          "sass-loader"
					// {
					// 	loader: require.resolve("sass-loader"),
					// 	options: {
					// 		data: `$var:${replaceVar};`
					// 	}
					// }
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
					"css-loader",
					postConfig
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "url-loader?limit=8192"
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[name].[contenthash:12].css" // use contenthash *
		}),
		new HtmlWebpackPlugin({
			filename: path.resolve(__dirname, "src/index.html"),
			template: path.resolve(__dirname, "src/temp.html"),
			inject: "body",
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: false
      },
      chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
		})
	],
	// Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: "empty",
		fs: "empty",
		net: "empty",
    tls: "empty",
    child_process: 'empty',
	},
	// Turn off performance hints during development because we don't do any
	// splitting or minification in interest of speed. These warnings become
	// cumbersome.
	performance: {
		hints: false
	}
};

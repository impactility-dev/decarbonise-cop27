const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	mode: "production",
	resolve: {
		fallback: {
			"fs": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
			"crypto": false,
			"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
		} 
	},
  entry: path.join(__dirname, "src", "index.js"),
	stats: {warnings:false},
	performance: {
		hints: false
	},
  output: {
    path:path.resolve(__dirname, "dist"),
		filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
				include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
					options: {
						presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
					}
        }
      },
			{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
		new NodePolyfillPlugin({
			excludeAliases: ['console']
		})
  ],
}
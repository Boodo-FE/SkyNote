import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _debug from 'debug'

const debug = _debug('app:prod')

debug('Create configuration')

export default {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './'
	},
	resolve: {
	    extensions: ['.js', '.jsx', '.json'],
	    modules: [
	      'src',
	      'node_modules',
	    ],
	 },
	 module: {
	 	rules: [
	 	  {
	 	  	test: /\.js$/,
	 	  	loader: 'babel-loader',
	 	  	exclude: /node_modules/,
	 	  	options: {
	 	  		cacheDirectory: true,
	 	  		babelrc: false,
	 	  		presets: ["es2015", "stage-0"],
				plugins: ["transform-runtime"]
	 	  	}
	 	  },
	 	  {
	 	  	test: /\.scss$/,
	 	  	loaders: 'style-loader!css-loader!sass-loader'
	 	  },
	 	  {
	 	  	test: /\.(jpe?g|png|gif|svg)$/,
	 	  	loader: 'url-loader?limit=8024&name=images/[name].[ext]'
	 	  }
	 	]
	 },
	 plugins: [
  	 	new webpack.optimize.OccurrenceOrderPlugin(),
  	 	new webpack.NoEmitOnErrorsPlugin(),
  	 	new HtmlWebpackPlugin({
  	 		filename: 'index.html',
  	 		template: './template/index.ejs',
  	 		inject: 'body',
  	 		hash: false
  	 	})	 
  	 ]
}
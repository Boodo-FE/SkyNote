import path from 'path'
import webpack from 'webpack'
import _debug from 'debug'

const debug = _debug('app:dev')

debug('Create configuration')

export default {
	devtool: 'source-map',
	entry: [
	    'webpack-hot-middleware/client?reload=true&path=http://localhost:3001/__webpack_hmr',
		'./src/app.js'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist/'),
		publicPath: 'http://localhost:3001/dist/'
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
	 	  	loaders: 'style!css!sass'
	 	  },
	 	  {
	 	  	test: /\.(jpe?g|png|gif|svg)$/,
	 	  	loader: 'url?limit=8024&name=images/[name].[ext]'
	 	  }
	 	]
	 },
	 plugins: [
  	 	new webpack.HotModuleReplacementPlugin(),
  	 	new webpack.NoEmitOnErrorsPlugin()	 ]
}
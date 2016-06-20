import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  /*_Tip:
  * defining a node environment variable,
  * to set react for production*/
  'process.env.NODE_ENV': JSON.stringify('production')
}

export default {
    debug: true,
  /*_Tip:
  * the reason we use this in prod is,
  * it is a little bit slower,
  * but it is more thorough,
  * and recommended for production */
    devtool: 'source-map',
    noInfo: false,
    entry: './src/index.js',
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
      /*_Tip:
      * contentBase changes because,
      * we are going to be serving from /dist,
      * rather than from /src */
        contentBase: './src'
    },
    plugins: [
      /*_Tip:
      * optimizes the order that our files are bundled in,
      * for optimal minification */
      new webpack.optimize.OccurenceOrderPlugin(),

      /*_Tip:
      * let's us define variables that are then made available,
      * to the libraries that webpack is bundling.
      * React for example, looks at the NODE_ENV variable,
      * to determine if it should be built in production mode.
      * Production mode omits development specific features like PropTypes,
      * increasing reacts performance,
      * also reduces the bundle size */
      new webpack.DefinePlugin(GLOBALS),

      /*_Tip:
      * allows us to extract our css into a separate file,
      * this will generate a separate physical styles.css file,
      * we will of course need to reference this separate file,
      * in the production version of our html file */
      new ExtractTextPlugin('styles.css'),

      /*_Tip:
      * eliminates duplicate packages in our final bundle,
      *  to keep our bundle size as small as possible,*/
      new webpack.optimize.DedupePlugin(),

      /*_Tip:
      * minifies our javascript,
      * only running this in production */
      new webpack.optimize.UglifyJsPlugin()
    ],
    // Tells webpack the types of files that we want it to handle.
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},

            {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};

import webpack from 'webpack';
import path from 'path';
const ExtractTextPlugin = require('extract-text-webpack-plugin');


  export default {
      debug: true,
      devtool: 'cheap-module-eval-source-map',
      noInfo: false,
      entry: [
          'eventsource-polyfill', // necessary for hot reloading with IE
          'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
          './src/index.js'
      ],
      target: 'web',
      output: {
          path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
          publicPath: '/',
          filename: 'bundle.js'
      },
      devServer: {
          contentBase: './src'
      },
      plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('react-toolbox.css', { allChunks: true })
      ],
      resolve: {
        extensions: ['', '.css', '.scss', '.js', '.json'],
        modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
        ]
      },
      sassLoader: {
        data: '@import "' + path.resolve(__dirname, 'src/styles/variables.scss') + '";'
      },

      // Tells webpack the types of files that we want it to handle.
      module: {
          loaders: [
              {test: /(\.js|\.jsx)$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
              {
                test: /\.s?css$/,
                loaders: ['style', 'css', 'sass'],
                exclude: /(node_modules)\/react-toolbox/
              },
              {
                test    : /(\.scss|\.css)$/,
                include : /(node_modules)\/react-toolbox/,
                loaders : [
                  require.resolve('style-loader'),
                  require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                  require.resolve('sass-loader') + '?sourceMap'
                ]
              },
              {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
              {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
              {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
              {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
          ]

      }
  };

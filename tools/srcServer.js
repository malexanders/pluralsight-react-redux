import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
/* Que?: config is the default name for what is exported from webpack.config.dev? */
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
/* Que? What is webpack-hot-middleware? */
app.use(require('webpack-hot-middleware')(compiler));

/* _Tip: Since we are building a single page app, we specify '*' here as the first arg
this way any request that the server receives ends up returning index.html */

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
      /* Que?: Why do you need ${port} here? Is this how string interpolation works in node?*/
        open(`http://localhost:${port}`);
    }
});

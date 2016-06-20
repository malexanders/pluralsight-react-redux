import express from 'express';
import path from 'path';
import open from 'open';

/*_Tip:
* configure express to use gZip compression,
* we can make the production build even smaller by doing this */
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();


/* _Tip: Since we are building a single page app, we specify '*' here as the first arg
this way any request that the server receives ends up returning index.html */

/*_Tip:
* this enables gzip compression */
app.use(compression());

app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
      /* Que?: Why do you need ${port} here? Is this how string interpolation works in node?*/
        open(`http://localhost:${port}`);
    }
});

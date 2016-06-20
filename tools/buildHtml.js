/*_Tip:
* comes with node,
* useful for interacting with the file system */
import fs from 'fs';

/*_Tip:
* gives us a handy way to interact with an in memory DOM,
* using jQuery selectors */
import cheerio from 'cheerio';

import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  /*_Tip:
  * passing the resulting html from index.html */
  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  /*_Tip:
  * writing the results to the dist folder,
  * and log a friendly message to the console */
  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err){
    if(err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});

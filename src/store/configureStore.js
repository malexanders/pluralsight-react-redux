/*_Tip:
* dynamic imports aren't support by ES6,
* so we are using require instead of import */

/*_Que? What is main difference between require and import? */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

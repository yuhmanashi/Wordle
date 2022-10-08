var path = require('path');

module.exports = {
  entry: "./wordle.jsx",
  output: {
      path: path.resolve(__dirname),
      filename: "bundle.js"
  }
};
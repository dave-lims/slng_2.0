const path = require('path');

module.exports = {
  mode: 'development',  // Set to 'development' or 'production'
  entry: './public/index.js',  // This is your entry point file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
};

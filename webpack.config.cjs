const path = require("path");
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({ path: './env' }); 

module.exports = {
    mode: "development",
    entry: {
      // define HTML files here (the key is output file w/o ext)
      index: "./public/index.html", // => dist/index.html
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      hot: true, // Enable hot module replacement
      liveReload: true, // Enable live reloading
      watchFiles: ['dist/**/*.css', 'dist/**/*.html'], // Ensure CSS changes are watched ------ TODO: maybe this is not working
  },
    module: {
        rules: [
            // Note: enable processing of HTML files from entry
            {
                test: /\.html$/,
                loader: HtmlBundlerPlugin.loader, // HTML loader
            },

            {
                test: /\.css$/i,
                // Note: this plugin extracts CSS self, no style-loader needed
                use: ["css-loader"],
            },
            {
                test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    // Note: define output filename of images
                    // filename: 'img/[name].[hash:8][ext]',
                    filename: 'img/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlBundlerPlugin({
          js: {
            // output filename of extracted JS from source script loaded in HTML via `<script>` tag
            filename: '[name].[contenthash:8].js',
          },
          css: {
            // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
            filename: 'css/[name].[contenthash:8].css',
          },
        }),

        // TODO: Currently am not using this, make sure to not forget about this
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        }),
    ],
    resolve: {
      alias: {
        'uri-js': 'fast-uri',
      },
    },
}

// module.exports = {
//   mode: 'development',  // Set to 'development' or 'production'
//   entry: './public/index.js',  // he entry point file
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),  // Output directory
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/, // Match .css files
//         use: ['style-loader', 'css-loader'], // Use these loaders
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html', // HTML file path
//       filename: 'index.html', // Output filename
//     }),
//   ],

//   // devServer: {
//   //   static: {
//   //     directory: path.join(__dirname, 'dist'),
//   //   },
//   //   port: 9000
//   // }
// };

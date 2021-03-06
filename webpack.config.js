const path = require('path')

module.exports = function (env, argv){
  var config = {
    entry: {
      gpxgen: "./src/index.tsx"
    },
    output: {
      filename: "[name]." + argv.mode + ".js",
      libraryTarget: 'var',
      library: '[name]'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", "jsx", ".json", "scss"]
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {test: /\.tsx?$/, loader: "awesome-typescript-loader"},

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},

        {
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
        },
        {
          test: /\.css$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }]
        }
      ]
    },
// --output-public-path=/dist --port 8080 --open
    devServer: {
      contentBase: path.resolve(__dirname, '.'),
      publicPath: "/dist",
      host: "192.168.1.69",
      port: 6999,
      open: false,
      historyApiFallback: true
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  }
  return config
}
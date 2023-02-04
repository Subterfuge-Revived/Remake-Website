let path = require('path');
let webpack = require('webpack');
let dotenv = require('dotenv');

dotenv.config({ path:  './.env.'+ process.env.NODE_ENV, debug: true })
let config = {
  'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'BASE_URL': JSON.stringify(process.env.BASE_URL),
  'VUE_APP_TITLE': JSON.stringify(process.env.VUE_APP_TITLE),
  'VUE_APP_ENVIRONMENT': JSON.stringify(process.env.VUE_APP_ENVIRONMENT),
  'VUE_APP_SERVER_URL': JSON.stringify(process.env.VUE_APP_SERVER_URL),
}

console.log("The generated config is: " + JSON.stringify(config))

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === "production" ? "/Remake-Website/" : "/dist/",
    filename: 'build.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      config: config,
      BASE_URL: JSON.stringify(process.env.BASE_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: './assets',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
            // convert Vue <style> tags into css
            'vue-style-loader',
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        parser: {
          amd: false
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: true,
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};
hallo. 
jika mengalami kesulitan bagian webpack akukasi source code, liat ini. pertaman kamu ikutin dulu cara instalasi webpack pada di coding beserta mode nya ( dev dan prod ).
terus webpack itu ada 3 kategori pertama. buat webpack.common.js , webpack.prod.js , webpack.dev.js ( nah ikutin instlasi ketiga webpack itu dari dicoding ).

nah kamu pastein ini :

untuk webpack.common.js :
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: path.join(__dirname, 'src/app.js'),   ( GANTI SAMA NAMA FILE JS KAMU APA )
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
    }),

    
  ],
};


INI UNTUK webpack.prod.js :
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
});

INI UNTUK webpack.dev.js :
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['index.html', 'src/**/*'],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});


coba pastein itu semua, ketika udah mengikuti cara instalasi dri dicoding.
oh ya maaf sebelumnya sekali lagi makasih dulu pernah bantuin aku:) 

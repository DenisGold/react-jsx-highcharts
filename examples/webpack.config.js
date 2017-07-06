const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const zipObject = require('lodash.zipobject');

const examples = [
  'AddSeries',
  'Combo',
  'Events',
  'Funnel',
  'Highstocks',
  'LiveUpdate',
  'SimpleLine',
  'SplineWithPlotBands',
  'SynchronisedCharts'
];

module.exports = {
  entry: zipObject(examples, examples.map(name => path.resolve(__dirname, name))),

  output: {
    filename: '[name]/bundle.js',
    path: __dirname,
    library: 'example',
    libraryTarget: 'var'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'highstock-release': 'Highcharts',
    '../..': 'ReactHighcharts'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ].concat(examples.map(name => {
    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html'),
      filename: `${name}/index.html`,
      chunks: [name],
      inject: 'body'
    });
  }))
};

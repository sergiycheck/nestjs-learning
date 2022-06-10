const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = {
  mode: 'development',
  target: 'node',
  entry: './src/lambda/index.js',
  output: {
    library: {
      type: 'umd',
    },
    path: path.resolve(__dirname, 'lambda_dist'),
    filename: 'index.js',
    clean: true,
  },
  devtool: 'source-map',
};

const deployLambdaConfig = {
  mode: 'development',
  target: 'node',
  entry: './src/deploy-lambda.js',
  output: {
    library: {
      type: 'commonjs',
    },
    path: path.resolve(__dirname, 'deploy_lambda_dist'),
    filename: 'index.js',
    clean: true,
  },
  devtool: 'source-map',
};

const clientConfig = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web', // <=== can be omitted as default is 'web',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devtool: 'source-map',
};

module.exports = [serverConfig, deployLambdaConfig, clientConfig];

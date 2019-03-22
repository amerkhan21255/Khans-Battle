var path = require('path');
var HtmWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['@babel/polyfill','./app/index.js'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: { 
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
        {test: /\.css$/, use: ['style-loader', 'css-loader']}
]
},
devServer: {
    historyApiFallback: true
},
mode: 'development',
plugins : [
    new HtmWebpackPlugin (
        {
            template: 'app/index.html'
        }
    )
]
};
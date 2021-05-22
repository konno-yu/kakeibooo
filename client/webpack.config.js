const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: 'file-loader'
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        htmlWebpackPlugin
    ]
}
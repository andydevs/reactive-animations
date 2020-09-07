/**
 * Use this template for building basic static websites
 * 
 * Author:  [Your Name Here]
 * Created: [Date of Creation]
 */
const path = require('path')

// Webpack config
module.exports = {
    mode: process.env.NODE_ENV || 'production',
    devtool: 'source-map',
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                exclude: /node_modules/,
                use: 'file-loader'
            }
        ]
    }
}
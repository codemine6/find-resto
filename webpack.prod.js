const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '-'
        }
    }
})

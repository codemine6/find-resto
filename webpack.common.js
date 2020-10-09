const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/templates/index.html'),
            scriptLoading: 'defer'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    globOptions: {
                        ignore: ['**/icon.png']
                    },
                    to: path.resolve(__dirname, 'dist/')
                }
            ]
        }),
        new MiniCssExtractPlugin(),
        new WebpackPwaManifest({
            name: 'Find Resto',
            short_name: 'FindResto',
            description: 'Find your favorite restaurants',
            start_url: '/',
            display: 'standalone',
            theme_color: '#000',
            background_color: '#fff',
            orientation: 'portrait-primary',
            fingerprints: false,
            ios: true,
            icons: [
                {
                    src: path.resolve('src/public/images/icon.png'),
                    sizes: [128, 144, 256, 512],
                    destination: 'icons'
                }, {
                    src: path.resolve('src/public/images/icon.png'),
                    size: '512x512',
                    purpose: 'maskable',
                    destination: 'icons'
                }
            ]
        }),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/scripts/sw.js'
        }),
        // new BundleAnalyzerPlugin()
    ]
}

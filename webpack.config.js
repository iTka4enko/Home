const webpack = require('webpack');
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd){
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const plugins = () =>{
    const conf = [
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: false
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/images'),
                    to: path.resolve(__dirname, 'build/images')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]

    if(isProd){
        conf.push(new BundleAnalyzerPlugin())
    }

    return conf
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index:'./index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    optimization: optimization(),
    devServer: {
        overlay: true,
        open: true,
        port: 5500
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {   
                exclude: /node_modules/,
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        },
                    },
                    'css-loader'
                ],
            },
            {   
                exclude: /node_modules/,
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.(ttf|eot|woff2|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    }
}
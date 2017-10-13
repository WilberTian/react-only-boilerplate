const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const BABEL_POLYFILL_NAME = 'babel-polyfill';

const rootPath = path.resolve(__dirname, '..');
let NODE_ENV = process.env.NODE_ENV

const postCSSLoader = {
   loader: "postcss-loader",
   options: {
        plugins: function() {
            return [
                require('autoprefixer')
            ];
       }
    }
};

module.exports = {
    context: rootPath,

    entry: {
        index: [
            'webpack-dev-server/client?http://127.0.0.1:3000/',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.resolve(rootPath, 'src/entries/index')
        ],
        detail: [
            'webpack-dev-server/client?http://127.0.0.1:3000/',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.resolve(rootPath, 'src/entries/detail')
        ],
        external: [
            'webpack-dev-server/client?http://127.0.0.1:3000/',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.resolve(rootPath, 'src/entries/external')
        ],
        [BABEL_POLYFILL_NAME]: 'babel-polyfill'
    },

    output: {
        path: path.resolve(rootPath, 'dist'),
        publicPath: '../',
        filename: "[name].bundle.js",
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [
                    path.resolve(rootPath, 'src'),
                ],
                use: 'eslint-loader',
            },
            {
                test: /\.js?$/,
                include: [
                    path.resolve(rootPath, 'src'),
                ],
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name]-[hash].[ext]',
                    }
                }]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(rootPath, 'src'),
                    path.resolve(rootPath, 'node_modules'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    postCSSLoader
                ]
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(rootPath, 'src'),
                    path.resolve(rootPath, 'node_modules'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    postCSSLoader,
                    'less-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
            },
        }),
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        */

        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", BABEL_POLYFILL_NAME],
            filename: "[name].js",
            minChunks: 2,
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',                                        
            template: rootPath + '/src/htmls/index.html',
            chunks: [BABEL_POLYFILL_NAME, 'common', 'index']
        }),

        new HtmlWebpackPlugin({
            filename: 'detail.html',                                        
            template: rootPath + '/src/htmls/detail.html',
            chunks: [BABEL_POLYFILL_NAME, 'common', 'detail']
        }),

        new HtmlWebpackPlugin({
            filename: 'external.html',                                        
            template: rootPath + '/src/htmls/external.html',
            chunks: [BABEL_POLYFILL_NAME, 'common', 'external']
        }),

        new ProgressBarPlugin({
            format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false
        })
    ],

    resolve: {
        extensions: ['*', '.js', '.css', '.less', '.html'],
        modules: ['src', 'node_modules'],
        alias: { }
    }
};


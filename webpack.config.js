const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name : 'Trip CheckList',
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: ['./src/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: ["src/css/"],
                            },
                        },
                    }
                ]
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     exclude: /node_modules/,
            //     use: [
            //         "style-loader",
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: 'file-loader',
            //             options: { 
            //                 outputPath: 'dist/css/', 
            //                 name: '[name].min.css'
            //             }
            //         },
            //         {
            //             loader: 'sass-loader',
            //             options: { 
            //                 sourceMap: true,
            //             }
            //         },
            //     ]
            // },

            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         "style-loader",
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 sourceMap: true,
            //             },
            //         },
            //         {
            //             loader: "sass-loader",
            //             options: {
            //                 sourceMap: true,
            //             },
            //         },
            //     ],
            // },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
            // chunkFilename: "[id].css",
        }),
    ],
};
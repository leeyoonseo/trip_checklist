const path = require('path');

module.exports = {
    name : 'Trip CheckList',
    entry: {
        "indexEntry" : './src/js/index.js',
        "editEntry" : './src/js/edit.js'
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
            }
        ]
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
};
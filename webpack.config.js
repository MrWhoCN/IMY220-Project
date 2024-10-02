const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, 'frontend', 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,  // For regular CSS
                use: ['style-loader', 'css-loader'], // Remove the "modules" option here
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'frontend', 'public'),
        },
        historyApiFallback: true,
        compress: true,
        port: 9000,
        hot: true,  // Ensure HMR is enabled
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/public/index.html',  // Point to your index.html file
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
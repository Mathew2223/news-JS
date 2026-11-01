const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (env) => {
    const isProd = env && env.mode === 'prod';

    return {
        mode: isProd ? 'production' : 'development',
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.tsx?$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins: [
            new DotenvWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
        devServer: {
            static: './dist',
            port: 3000,
            open: true,
        }
    };
};
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');


module.exports = (env) => {

        // Get the root path (assuming webpack config is in the root of your project!)
        const currentPath = path.join(__dirname);

        // Create the fallback path (the production .env)
        const basePath = currentPath + '/env/.env';
    
        // We're concatenating the environment name to our filename to specify the correct env file!
        const envPath = basePath + '.' + env.ENVIRONMENT;
    
        // Check if the file exists, otherwise fall back to the production .env
        const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    
        // Set the path parameter in the dotenv config
        const fileEnv = dotenv.config({ path: finalPath }).parsed;
    
        // reduce it to a nice object, the same as before (but with the variables from the file)
        const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
            return prev;
        }, {});

    return ({
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, '/build'), //build folder
            filename: 'bundlefile.js', //bundle file name
            publicPath: '/'
        },
        devServer: {
            host: 'localhost',
            port: '8080',
            historyApiFallback: true,
        },
        module: { 
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_module/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {

                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                },
                {

                    test: /\.s(a|c)ss$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                },
                {
                    test: /\.(gif|png|jpe?g|svg|ttf|otf|woff|eot|woff2)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                        },
                    ],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new webpack.ProvidePlugin({
                "React": "react",
            }),
            new webpack.DefinePlugin(envKeys),
            new JavaScriptObfuscator ({
                rotateUnicodeArray: true
            })
        ]
    });
}

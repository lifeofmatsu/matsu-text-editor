const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js', // Main entry point for your application.
            install: './src/js/install.js', // Separate entry for installable PWA logic.
        },
        output: { // Output configuration for webpack.
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [ // Array of plugins used by webpack.
            new HtmlWebpackPlugin({ // Simplifies creation of HTML files to serve webpack bundles.
                template: './index.html',
                title: 'J.A.T.E',
            }),
            new InjectManifest({ // Plugin for injecting the manifest for workbox-powered service workers.
                swSrc: './src-sw.js',
                swDest: 'service-worker.js',
            }),
            new WebpackPwaManifest({ // Generates a manifest for the PWA.
                fingerprints: false,
                inject: true,
                name: 'JATE Text Editor',
                short_name: 'JATE',
                description: 'Just Another Text Editor!',
                background_color: '#225ca3',
                theme_color: '#225ca3',
                id: '/',
                start_url: '/',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve('client/src/images/icon.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: 'icons',
                    },
                ],
            }),
        ],
        module: {
            rules: [ // Rules for module (file) handling.
                {
                    test: /\.css$/i, // Regex for matching CSS files.
                    use: ['style-loader', 'css-loader'], // Loaders for handling CSS.
                },
                {
                    test: /\.m?js$/, // Regex for matching JavaScript files.
                    exclude: /(node_modules|bower_components)/, // Excluding node_modules and bower_components.
                    use: {
                        loader: 'babel-loader', // Loader for transpiling JavaScript files.
                        options: { // Options for Babel.
                            presets: ['@babel/preset-env'], // Preset for compiling ES2015+ syntax.
                            plugins: ['@babel/plugin-transform-runtime'], // Plugin to avoid duplication in compiled output.
                        },
                    },
                },
            ],
        },
    };
};

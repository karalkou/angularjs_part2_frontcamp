const path = require('path');
const merge = require('webpack-merge');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const stylesDev = require('./configs/webpack/styles.dev');
const stylesProd = require('./configs/webpack/styles.prod');
const jsConfig = require('./configs/webpack/js');
const html = require('./configs/webpack/html');
const devserver = require('./configs/webpack/devserver');
const images = require('./configs/webpack/images');
const fonts = require('./configs/webpack/fonts');

const PATHS = {
    templates: path.join(__dirname, 'client'),
};

const common = merge([
    {
        entry: ['babel-polyfill', './client/app'],

        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './build/')
        },

        resolve: {
            extensions: ['.js'],
        },

        plugins: [
            new ngAnnotatePlugin({
                add: true,
                // other ng-annotate options here
            }),
        ]
    },

    jsConfig(),
    images(),
    fonts(),
]);

module.exports = function returnConfig(env) {
    if (env === 'production') {
        return merge([
            {
                mode: 'production',

                output: {
                    publicPath: './build/',
                },

                optimization: {
                    minimize: true,
                },
            },
            common,
            stylesProd(),
        ]);
    }

    if (env === 'development') {
        return merge([
            {
                mode: 'development'
            },
            common,
            html(PATHS.templates),
            devserver(),
            stylesDev(),
        ]);
    }

    return undefined;
};

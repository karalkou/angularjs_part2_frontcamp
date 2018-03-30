const path = require('path');

module.exports = function returnStylesConfig() {
    return {
        module: {
            rules: [
                {
                    test: /\.(css|less|styl|scss|sass|sss)$/,
                    rules: [
                        {
                            use: 'style-loader',
                        },

                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                minimize: false,
                            },
                        },

                        // To use autoprefixer
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },

                        // Compile Sass to CSS
                        // https://github.com/webpack-contrib/sass-loader
                        // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
    };
};

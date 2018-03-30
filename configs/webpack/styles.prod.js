const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function returnStylesConfig() {
    return {
        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'style-loader',
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
                    }),
                },
            ],
        },

        plugins: [
            new ExtractTextPlugin("style.css")
        ],
    };
};

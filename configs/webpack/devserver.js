module.exports = function returnDevServerConfig() {
    return {
        devServer: {
            proxy: [{
                path: '/api/',
                target: 'http://localhost:8050', // port of mock server
            }],
            historyApiFallback: true,
        },
    };
};

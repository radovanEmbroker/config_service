var path = require("path");
var webpack = require("webpack");
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function(grunt) {
    var gruntConfig = {
        clean: {
            client: ['client/compiled/*.{js,css,map,html}'],
        },
        webpack: {
            options: {
                module: {
                    rules: [{
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                    }]
                },
                stats: {
                    colors: true,
                },
                devtool: 'source-map',
            },
            client: {
                entry: {
                    main: './client/source/main.js',
                    vendor: 'angular'
                },
                output: {
                    filename: '[name].js',
                    path: path.resolve(__dirname, 'client/compiled')
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'vendor' // Specify the common bundle's name.
                    }),
                    new ManifestPlugin({
                        fileName: 'my-manifest.json',
                        basePath: '/client/compiled/'
                    })
                ]
            },
        }
    };

    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask("client", ['clean:client', 'webpack:client']);
    grunt.registerTask("build", ['client']);
    grunt.registerTask("default", ['build']);
};

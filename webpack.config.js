const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/js/weather_app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html"],
    },
};
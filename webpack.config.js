const path = require("path");

module.exports = [{
    entry: "./assets/js/index.js",
    watch: true,
    mode: "production",
    output: {
        path: path.resolve(__dirname, "assets/built/"),
        filename: "index.js",
    },
    devServer: {
        writeToDisk: true,
    },
}, ];

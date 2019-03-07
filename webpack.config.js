module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: [
            ".js",
            ".ts"
        ]
    },
    entry: [
        "./src/main.ts"
    ]
};

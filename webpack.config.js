const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'footnotes.js',
        library: {
            name: "Footnotes",
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                        },
                    },
                ],
            },
        ],
    },
}

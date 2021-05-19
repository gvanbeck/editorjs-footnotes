const path = require('path');

module.exports = {
    mode: 'development',
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
                include: path.resolve(__dirname, 'src'),
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

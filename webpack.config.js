module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        main: './phaser/src/main.ts'
    },
    output: {
        path: __dirname + '/phaser/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader'
            }
        ]
    },
    // こいつが無いとwebpack-dev-serverを起動した際にModule not found: Error: Can't resolveがでる。
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: __dirname + '/phaser/dist' // 重要：outputのpathと一致させないとwebpack-dev-serverの自動ビルドが動かない
    },
    devtool: 'inline-source-map'
}

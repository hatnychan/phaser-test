module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/main.ts',

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // こいつが無いとwebpack-dev-serverを起動した際にModule not found: Error: Can't resolveがでる。
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: 'inline-source-map',
}

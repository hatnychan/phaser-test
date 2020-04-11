module.exports = {
    // ESLint で使用するパーサーを指定する
    parser: "@typescript-eslint/parser",
    extends: [
      "eslint:recommended",
      // @typescript-eslint/eslint-plugin のおすすめルールを適用する
      "plugin:@typescript-eslint/recommended",
      // Prettier と競合している ESLint のルールを無効にする
      "prettier/@typescript-eslint",
      // `eslint-config-prettier` と `eslint-plugin-prettier` を有効化する
      // ※ extends 配列の一番最後に配置すること
      "plugin:prettier/recommended" 
    ],
    plugins: [
      "@typescript-eslint"
    ],
    env: { "browser": true, "node": true, "es6": true },
    parserOptions: {
      // 最新の ECMAScript を許可する
      ecmaVersion: 2018,
      // ecmaVersion を指定してもこの記述を入れておかないと import/export 解析されない
      sourceType: "module"
    },
    rules: {
      //Prettier の設定を記述
      "prettier/prettier": [
        "error",
        {
          trailingComma: "none",
          endOfLine: "lf",
          semi: false,
          singleQuote: true,
          printWidth: 120,
          tabWidth: 4
        }
      ]
    },
  };
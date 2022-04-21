const path = require('path');

// entryには、最初に読み込むファイルを指定する
// ここで指定されたファイルに別のファイルを読み込む処理が書かれていると、
// webpackはそれらのファイルも自動的に読み込んで、
// 最終的に1つのファイルとして出力します。
// outputには、出力するファイルの設定をします。
// distというディレクトリに対して、ファイル名bundle.jsで出力します
// publickPathは相対パスのリソースに自動的にdist/をつけてくれる
// moduleのrulesセクションでは、webpackに対してビルド時に追加で行う処理を記述できる
// .tsで終わるファイルに対して、ts-loaderを実行しています。
// excludeで除外するファイルを正規表現で指定します。
// node_modules 配下のファイルは特にビルドする必要がないので除外します
// resolve セクションは、モジュールとして解決するファイルの拡張子を指定します。
// Reactのファイルや外部ファイルも解決したいので、jsとtsxを追加した
module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ] 
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  }
};

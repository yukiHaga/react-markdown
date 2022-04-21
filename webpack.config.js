const path = require('path');

// entryには、最初に読み込むファイルを指定する
// ここで指定されたファイルに別のファイルを読み込む処理が書かれていると、
// webpackはそれらのファイルも自動的に読み込んで、
// 最終的に1つのファイルとして出力します。
// outputには、出力するファイルの設定をします。
// distというディレクトリに対して、ファイル名bundle.jsで出力します
// publickPathは相対パスのリソースに自動的にdist/をつけてくれる
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  }
};

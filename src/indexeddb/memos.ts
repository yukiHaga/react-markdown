import Dexie from "dexie";

// IndexedDBのオブジェクトストアに保存するデータの型を定義する
export type MemoRecord = {
  datetime: string;
  title: string;
  text: string;
};

// Dexieのインスタンスを生成する
// DB名はmarkdown-editorとする
const database = new Dexie("markdown-editor");

// .version(1)はデータベースのバージョンです
// .storesで、オブジェクトストアのストア名とインデックスとなるデータのデータ名を指定する
// 今回のオブジェクトストアのストア名はmemosである。
database.version(1).stores({ memos: "&datetime" });

// データを扱うオブジェクトストアを定義している
// Generics型を定義している
// 型引数の1番目はデータの型
// 型引数の2番目はキーとなるデータの型
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

// オブジェクトストアへの保存
// メモのタイトルとテキストを引数として受け取る関数を定義した
// new Date().toString()で、ISOの国際規格の表記で日付と時刻を取得できる
// 2022-04-22T13:35:48.875Zという感じ
// memos.putでオブジェクトストアにデータを保存している
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toString();
  await memos.put({ datetime, title, text });
};

const NUM_PER_PAGE: number = 10;

// memos.count()で、オブジェクトストアから総件数を取得します
// count()はDexieに定義された関数です
// Math.ceil()は小数点以下を切り上げた数値を戻り値として返します
// 四捨五入とか関係なしに切り上げます
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count();
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};

// toArrayで取得したデータを配列にしている
// offsetは位置を表す
// offset()は取得するリスト内の開始位置を設定します。
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE;
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray();
};

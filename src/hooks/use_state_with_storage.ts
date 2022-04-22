import { useState } from "react";

// initはstateの初期値
// keyはローカルストレージの値を参照したり、保存したりするのに使うキー
// 関数内部で、stateと最新のstateの値を保存して更新する関数を定義している
// 戻り値で、stateとその関数を要素とする配列を返している
// localStorageに保存するような処理を何度も書きたくないから、カスタムフックを定義した
// カスタムフック内で、stateを更新すると、そのカスタムフックを呼び出したコンポーネントが再レンダリングされるだけ
export const useStateWithStorage = (
  init: string,
  key: string
): [string, (s: string) => void] => {
  const [value, setValue] = useState(localStorage.getItem(key) || init);

  // nextValueは次のstateの値
  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue);
    localStorage.setItem(key, nextValue);
  };

  return [value, setValueWithStorage];
};

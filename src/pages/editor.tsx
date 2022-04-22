import { useState, Fragment } from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`;

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

// position: absoluteにして位置をずらしている
// 本来は、親要素にposition: relativeを指定しないとダメ
const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;

// localStorageのキー
// このキーは、データの参照・保存で使う
// キー名はアプリケーションで重複させないように、「ファイルパス：値の名前」という
// 命名規則にする。
// localStorageのgetItemとsetItemを使って、データをローカルストレージに参照・保存する
const StorageKey = "pages/editor:text";

// useStateの初期値で型推論ができるなら、
// useState<string>と書かなくて良い
// 以下の場合、型推論でtextがstring型になっている
// 数値のみで構成された配列の場合、初期値が空の配列のだと
// useState([])で型推論できないので、
// useState<number[]>([])と書く
// The onChange event in React detects
// when the value of an input element changes.
export const Editor = (): JSX.Element => {
  const [text, setText] = useStateWithStorage("", StorageKey);
  return (
    <>
      <Header>最強のマークダウンエディター</Header>
      <Wrapper>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  );
};

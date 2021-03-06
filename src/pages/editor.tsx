import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import { putMemo } from "../indexeddb/memos";
import { Button } from "../components/button";
import { SaveModal } from "../components/save_modal";
import { Link } from "react-router-dom";
import { Header } from "../components/header";
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";

// Workerのインスタンスを生成している
const convertMarkdownWorker = new ConvertMarkdownWorker();

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
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
type Props = {
  text: string;
  setText: (text: string) => void;
};

// useStateの初期値で型推論ができるなら、
// useState<string>と書かなくて良い
// 以下の場合、型推論でtextがstring型になっている
// 数値のみで構成された配列の場合、初期値が空の配列のだと
// useState([])で型推論できないので、
// useState<number[]>([])と書く
// The onChange event in React detects
// when the value of an input element changes.
// ReactMarkdown内の文字のマークダウンがJSXに変換される
export const Editor = ({ text, setText }: Props): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState("");

  // 初回のみWorkerから結果を受け取る関数を登録しておきます
  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html);
    };
  }, []);

  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);

  return (
    <>
      <HeaderArea>
        <Header title="究極のマークダウンエディタ">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

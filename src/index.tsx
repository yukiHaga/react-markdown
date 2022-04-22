import * as React from "react";
import { render } from "react-dom";
import { Editor } from "./pages/editor";
import { createGlobalStyle } from "styled-components";
import { HashRouter as Router, Route, Navigate } from "react-router-dom";

// styled-componentsのcreateGlobalStyleを使って、
// ページ全体に適用できるスタイルを定義しています。
// widthとheightは初期状態だと、コンテンツに対して指定される
// 以下のように設定することで、widthとheightにpaddingとborderが含まれる
// widthとheightが固定されている場合、
// paddingとborderがでかくなるごとに、中のcontentが小さくなる。
// 「*」は、すべての要素にスタイルを適用する全称セレクタです
const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`;

// styled-componentsのグローバルスタイルを適用させるためには、
// createGlobalStyleで作ったGlobalStyleを、
// リアクトツリーの最上位のコンポーネントの中にGlobalStyleを書く
const Main = (
  <>
    <GlobalStyle />
    <Router>
      <Route path="/editor" element={<Editor />} />
      <Route path="/history" element={<h1>History</h1>} />
      <Route path="/*" element={<Navigate to="/editor" replace />} />
    </Router>
  </>
);
render(Main, document.getElementById("app"));

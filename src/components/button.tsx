import { ReactNode } from "react";
import { propTypes } from "react-markdown";
import styled from "styled-components";

// &.はscssの構文。scssの構文をstyled-componentsでも使える
// StyledButton.cancelというcssセレクタにコンパイルされる
// cancelが存在するときだけ適用される
const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;

// ?はオブジェクトのプロパティがあってもなくても良いを表す。
type Props = {
  onClick: () => void;
  children: ReactNode;
  cancel?: boolean;
};

export const Button = ({ onClick, children, cancel }: Props): JSX.Element => (
  <StyledButton onClick={onClick} className={cancel ? "cancel" : ""}>
    {children}
  </StyledButton>
);

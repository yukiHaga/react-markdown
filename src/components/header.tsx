import { ReactNode } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`;

// & > *は、HeaderControlの子セレクタに対して、
// margin-leftを適用させる
const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;

  & > * {
    margin-left: 0.5rem;
  }
`;

type Props = {
  title: string;
  children: ReactNode;
};

export const Header = ({ title, children }: Props): JSX.Element => (
  <HeaderWrapper>
    <HeaderTitle>{title}</HeaderTitle>
    <HeaderControl>{children}</HeaderControl>
  </HeaderWrapper>
);

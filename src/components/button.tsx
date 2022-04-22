import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
`;

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const Button = ({ onClick, children }: Props): JSX.Element => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

import styled from "styled-components";

export const Error = styled.div<{ $mb?: boolean; grid?: boolean }>`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  width: 70%;
  margin-top: 5px;
  margin-bottom: ${({ grid }) => grid && "5px"};
`;

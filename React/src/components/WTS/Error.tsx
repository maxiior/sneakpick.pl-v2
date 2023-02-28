import styled from "styled-components";

export const Error = styled.div<{ $mb?: boolean; grid?: boolean }>`
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  margin-left: ${({ grid }) => grid && "10px"};
  margin-top: ${({ grid }) => (grid ? "0" : "3px")};
  font-weight: 500;
  margin-bottom: ${({ $mb }) => $mb && "10px"};
`;

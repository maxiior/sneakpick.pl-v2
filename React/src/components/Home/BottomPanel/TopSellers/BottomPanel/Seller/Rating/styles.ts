import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
`;

export const Step = styled.div<{ blank?: boolean }>`
  height: 25px;
  width: 14px;
  background-color: ${({ theme, blank }) => (blank ? theme.grey : theme.blue)};
  margin-left: 1px;

  :last-child {
    margin: 0;
  }
`;

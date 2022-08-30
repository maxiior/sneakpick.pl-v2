import styled from "styled-components";

const Elements = styled.div<{ borderNone?: boolean; mobile: boolean }>`
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  display: ${({ mobile }) => mobile && "flex"};
  justify-content: ${({ mobile }) => mobile && "center"};
  border: ${({ borderNone }) => borderNone && "none"};
`;

export default Elements;

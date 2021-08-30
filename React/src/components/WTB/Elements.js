import styled, { css } from "styled-components";

const Elements = styled.div`
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};

  ${({ mobile }) =>
    mobile &&
    css`
      display: flex;
      justify-content: center;
    `}

  ${({ borderNone }) =>
    borderNone &&
    css`
      border: none;
    `}
`;

export default Elements;

import styled, { css } from "styled-components";

const Paragraph = styled.p<{ mobile: boolean }>`
  font-size: 16px;
  margin: 0;
  color: ${({ theme }) => theme.blue};

  ${({ mobile }) =>
    mobile &&
    css`
      display: flex;
      justify-content: center;
      font-size: 24px;
    `}
`;

export default Paragraph;

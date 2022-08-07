import styled from "styled-components";

const Header = styled.div<{ small?: boolean; nonPaddingBelow?: boolean }>`
  font-size: ${({ small }) => (small ? "15px" : "20px")};
  padding: ${({ nonPaddingBelow }) =>
    nonPaddingBelow ? "20px 0 0 0" : "20px 0 10px 0"};
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export default Header;

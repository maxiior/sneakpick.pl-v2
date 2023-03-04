import styled from "styled-components";

const Header = styled.div<{ small?: boolean }>`
  font-size: ${({ small }) => (small ? "15px" : "20px")};
  margin-top: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export default Header;

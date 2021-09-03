import styled from "styled-components";

const Header = styled.div`
  font-size: ${({ small }) => (small ? "15px" : "20px")};
  padding: 20px 0 10px 0;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export default Header;

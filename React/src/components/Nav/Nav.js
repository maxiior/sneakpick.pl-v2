import Options from "components/Nav/Options";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #191919;
  height: 60px;
  width: 100%;
  position: fixed;
  position: -webkit-sticky;
  font-size: 16px;
  font-weight: 500;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  z-index: 999;
`;

const Nav = () => {
  return (
    <StyledNav>
      <Options />
    </StyledNav>
  );
};

export default Nav;

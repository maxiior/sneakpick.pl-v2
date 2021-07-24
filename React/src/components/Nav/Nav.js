import Options from "components/Nav/Options";
import styled from "styled-components";
import logo from "assets/logo.png";
import Search from "components/Nav/Search";

const StyledNav = styled.nav`
  background-color: #191919;
  height: 60px;
  width: 100%;
  position: fixed;
  position: -webkit-sticky;
  font-weight: 500;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  white-space: nowrap;
`;

const Logo = styled.img`
  width: 150px;
  height: 22px;
  cursor: pointer;
`;

const LogoHolder = styled.div`
  padding: 0 40px;
`;

const Nav = ({ setLoginView, setRegisterView }) => {
  return (
    <StyledNav>
      <LogoHolder>
        <Logo src={logo} />
      </LogoHolder>
      <Search type="search" placeholder="Szukaj przedmiotów" />
      <Options setLoginView={setLoginView} setRegisterView={setRegisterView} />
    </StyledNav>
  );
};

export default Nav;

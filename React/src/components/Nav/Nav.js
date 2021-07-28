import Options from "components/Nav/Options";
import styled from "styled-components";
import logo from "assets/logo.png";
import Search from "components/Nav/Search";
import { AiOutlineMenu } from "react-icons/ai";

const StyledNav = styled.nav`
  background-color: #191919;
  height: 60px;
  width: 100%;
  position: fixed;
  position: -webkit-sticky;
  font-weight: 500;
  user-select: none;
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

const SearchBar = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.grey};
  padding: 0 40px;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const DefaultBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const StyledSearch = styled(Search)`
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

const IconHolder = styled.div`
  padding-right: 40px;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

const StyledAiOutlineMenu = styled(AiOutlineMenu)`
  color: white;
  font-size: 35px;
  cursor: pointer;
`;

const Nav = ({ setLoginView, setRegisterView }) => {
  return (
    <StyledNav>
      <DefaultBar>
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <StyledSearch type="search" placeholder="Szukaj przedmiotów" />
        <Options
          setLoginView={setLoginView}
          setRegisterView={setRegisterView}
        />
        <IconHolder>
          <StyledAiOutlineMenu />
        </IconHolder>
      </DefaultBar>
      <SearchBar>
        <Search type="search" placeholder="Szukaj przedmiotów" />
      </SearchBar>
    </StyledNav>
  );
};

export default Nav;

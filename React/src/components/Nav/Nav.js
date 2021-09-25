import Options from "components/Nav/Options";
import styled from "styled-components";
import logo from "assets/logo.png";
import Search from "components/Nav/Search";
import { AiOutlineMenu } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { routes } from "routes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMenuView, hideCommunicatorIcon } from "store/interface/actions";

const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.veryDarkGrey};
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

const LogoHolder = styled(Link)`
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
  color: ${({ theme }) => theme.white};
  font-size: 35px;
  cursor: pointer;
`;

const Nav = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ search: "" });

  const goSearch = (e) => {
    history.push({
      pathname: routes.WTB,
      search: "?search=" + data.search + "?" + routes.DEFAULT_SEARCH,
    });
    window.location.reload();
  };

  return (
    <StyledNav>
      <DefaultBar>
        <LogoHolder to={routes.HOME}>
          <Logo src={logo} />
        </LogoHolder>
        <StyledSearch
          placeholder="Szukaj przedmiotów"
          onSubmit={goSearch}
          data={data}
          setData={setData}
        />
        <Options />
        <IconHolder>
          <StyledAiOutlineMenu
            onClick={() => {
              dispatch(hideCommunicatorIcon());
              dispatch(openMenuView());
            }}
          />
        </IconHolder>
      </DefaultBar>
      <SearchBar>
        <Search
          placeholder="Szukaj przedmiotów"
          onSubmit={goSearch}
          data={data}
          setData={setData}
        />
      </SearchBar>
    </StyledNav>
  );
};

export default Nav;

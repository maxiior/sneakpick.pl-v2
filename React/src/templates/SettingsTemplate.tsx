import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useAuthenticated from "hooks/useAuthenticated";
import MobileMenu from "components/Settings/MobileMenu";
import { routes } from "routes";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const Container = styled.div`
  padding: 30px 0px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: none;
  }
`;

const Nav = styled.div`
  width: 100%;
`;

const Option = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  display: block;
  margin-bottom: 15px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }

  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;

const Settings = styled.div`
  padding: 0 30px;
`;

const Header = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 25px;
`;

const Holder = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 60px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: flex;
  }
`;

const SettingsTemplate = ({ children }: { children: React.ReactNode }) => {
  useAuthenticated();

  return (
    <Wrapper>
      <Container>
        <MobileMenu />
        <Holder>
          <Menu>
            <div>
              <Header>Ustawienia</Header>
              <Nav>
                <Option to={routes.PROFILE_SETTINGS}>Szczegóły profilu</Option>
                <Option to={routes.ACCOUNT_SETTINGS}>Ustawienia konta</Option>
                <Option to={routes.SHIPMENT}>Wysyłka</Option>
              </Nav>
            </div>
          </Menu>
          <Settings>{children}</Settings>
        </Holder>
      </Container>
    </Wrapper>
  );
};

export default SettingsTemplate;

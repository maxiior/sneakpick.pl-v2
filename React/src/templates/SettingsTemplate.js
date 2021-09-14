import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const Container = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 30px 0;
`;

const Menu = styled.div``;

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
  padding: 0 60px;
`;

const Header = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 25px;
`;

const SettingsTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Menu>
          <Header>Ustawienia</Header>
          <Nav>
            <Option to="/settings/profile" activeclass="active">
              Szczegóły profilu
            </Option>
            <Option to="/settings/account" activeclass="active">
              Ustawienia konta
            </Option>
          </Nav>
        </Menu>
        <Settings>{children}</Settings>
      </Container>
    </Wrapper>
  );
};

export default SettingsTemplate;

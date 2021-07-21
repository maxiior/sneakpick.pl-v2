import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled.div`
  background-color: #191919;
  height: 60px;
  width: 100%;
  font-weight: 500;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  text-transform: uppercase;
  color: white;
  font-size: 12px;
`;

const Options = styled.ul`
  list-style: none;
  padding: 0;
`;

const Option = styled.li`
  display: inline-block;
  :first-child::before {
    content: "";
  }

  ::before {
    content: "|";
    padding: 0 5px;
  }
`;

const Copyright = styled.div``;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Options>
        <Option>
          <StyledLink to={routes.FAQ}>FAQ</StyledLink>
        </Option>
        <Option>
          <StyledLink to={routes.SUPPORT}>SUPPORT</StyledLink>
        </Option>
        <Option>
          <StyledLink to={routes.BUSINESSCONTACT}>BUSINESS CONTACT</StyledLink>
        </Option>
      </Options>
      <Copyright>COPYRIGHT 2021 BY SNEAKPICK. ALL RIGHTS RESERVED.</Copyright>
    </Wrapper>
  );
};

export default Footer;

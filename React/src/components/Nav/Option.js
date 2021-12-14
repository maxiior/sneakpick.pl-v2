import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "components/Nav/Dropdown";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
    padding-bottom: 17px;
    border-bottom: 3px solid ${({ theme }) => theme.blue};
  }

  &.active {
    color: ${({ theme }) => theme.blue};
    padding-bottom: 17px;
    border-bottom: 3px solid ${({ theme }) => theme.blue};
  }
`;

const StyledDropdown = styled(Dropdown)`
  display: none;
`;

const Wrapper = styled.div`
  margin: 0 15px;
  position: relative;

  :hover ${StyledDropdown} {
    display: block;
  }
`;

const Option = ({ text, where }) => {
  return (
    <Wrapper>
      <StyledNavLink exact={where === "/"} to={where} activeclass="active">
        {text}
        <StyledDropdown />
      </StyledNavLink>
    </Wrapper>
  );
};

export default Option;

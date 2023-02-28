import styled from "styled-components";
import Dropdown from "components/Nav/Options/Option/Dropdown";
import { iOption } from "types/Nav/Options/Option/option";
import { NavLink } from "react-router-dom";

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

const Option = ({ text, to, onClick, popup }: iOption) => {
  return (
    <Wrapper>
      <StyledNavLink to={to} onClick={() => onClick && onClick()}>
        {text}
        {popup && <StyledDropdown />}
      </StyledNavLink>
    </Wrapper>
  );
};

export default Option;

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;

  :hover {
    color: #00b4ff;
    padding-bottom: 17px;
    border-bottom: 3px solid #00b4ff;
  }

  &.active {
    color: #00b4ff;
    padding-bottom: 17px;
    border-bottom: 3px solid #00b4ff;
  }
`;

const StyledOption = styled.div`
  margin: 0 15px;
`;

const Option = ({ text, where }) => {
  return (
    <StyledOption>
      <StyledNavLink to={{ where }} activeclass="active">
        {text}
      </StyledNavLink>
    </StyledOption>
  );
};

export default Option;

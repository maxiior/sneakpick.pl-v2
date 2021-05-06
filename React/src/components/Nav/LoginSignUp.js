import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #00b4ff;
`;

const StyledOption = styled.div`
  margin: 0 15px;
`;

const LoginSignUp = ({ text, where }) => {
  return (
    <StyledOption>
      <StyledNavLink to={{ where }}>{text}</StyledNavLink>
    </StyledOption>
  );
};

export default LoginSignUp;

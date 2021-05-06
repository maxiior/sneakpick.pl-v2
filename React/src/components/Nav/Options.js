import Option from "components/Nav/Option";
import LoginSignUp from "components/Nav/LoginSignUp";
import styled from "styled-components";

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Options = () => {
  return (
    <StyledOptions>
      <Option text="WTB" where="/" />
      <Option text="WTS" where="/" />
      <Option text="WTT" where="/" />
      <Option text="PROXY" where="/" />
      <Option text="STEAL" where="/" />
      <Option text="TALK" where="/" />
      <LoginSignUp text="LOGIN" where="/" />
      <LoginSignUp text="SIGN UP" where="/" />
    </StyledOptions>
  );
};

export default Options;

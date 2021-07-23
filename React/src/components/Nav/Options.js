import Option from "components/Nav/Option";
import styled from "styled-components";
import { routes } from "routes";

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const LoginSignUp = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: #00b4ff;
  cursor: pointer;
`;

const Options = ({ setLoginView, setRegisterView }) => {
  return (
    <StyledOptions>
      <Option text="WTB" where={routes.WTB} />
      <Option text="WTS" where={routes.WTS} />
      <Option text="WTT" where={routes.WTT} />
      <Option text="PROXY" where={routes.PROXY} />
      <Option text="STEAL" where={routes.STEAL} />
      <Option text="TALK" where={routes.TALK} />
      <LoginSignUp onClick={() => setLoginView(true)}>LOGIN</LoginSignUp>
      <LoginSignUp onClick={() => setRegisterView(true)}>SIGN UP</LoginSignUp>
    </StyledOptions>
  );
};

export default Options;

import Option from "components/Nav/Option";
import styled from "styled-components";
import LoggedPanel from "components/Nav/LoggedPanel";
import { routes } from "routes";
import {
  openRegisterView,
  openLoginView,
  hideCommunicatorIcon,
} from "store/interface/actions";
import { useDispatch, useSelector } from "react-redux";

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 100%;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LoginSignUp = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`;

const Options = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );

  return (
    <StyledOptions>
      <Option text="WTB" where={routes.WTB} />
      <Option text="WTS" where={routes.WTS} />
      <Option text="WTT" where={routes.WTT} />
      <Option text="PROXY" where={routes.PROXY} />
      <Option text="STEAL" where={routes.STEAL} />
      <Option text="TALK" where={routes.TALK} />
      {!isAuthenticated ? (
        <>
          <LoginSignUp
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(hideCommunicatorIcon());
              dispatch(openLoginView());
            }}
          >
            LOGIN
          </LoginSignUp>
          <LoginSignUp
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(hideCommunicatorIcon());
              dispatch(openRegisterView());
            }}
          >
            SIGN UP
          </LoginSignUp>
        </>
      ) : (
        <LoggedPanel />
      )}
    </StyledOptions>
  );
};

export default Options;

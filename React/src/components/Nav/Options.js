import Option from "components/Nav/Option";
import styled from "styled-components";
import Logout from "components/Nav/Logout";
import { routes } from "routes";
import {
  openRegisterView as openRegisterViewAction,
  openLoginView as openLoginViewAction,
  hideCommunicatorIcon as hideCommunicatorIconAction,
} from "actions/interface";
import { connect } from "react-redux";

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;

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

const Options = ({ openRegisterView, openLoginView, hideCommunicatorIcon }) => {
  return (
    <StyledOptions>
      <Option text="WTB" where={routes.WTB} />
      <Option text="WTS" where={routes.WTS} />
      <Option text="WTT" where={routes.WTT} />
      <Option text="PROXY" where={routes.PROXY} />
      <Option text="STEAL" where={routes.STEAL} />
      <Option text="TALK" where={routes.TALK} />
      <LoginSignUp
        onClick={() => {
          window.scrollTo(0, 0);
          hideCommunicatorIcon();
          openLoginView();
        }}
      >
        LOGIN
      </LoginSignUp>
      <LoginSignUp
        onClick={() => {
          window.scrollTo(0, 0);
          hideCommunicatorIcon();
          openRegisterView();
        }}
      >
        SIGN UP
      </LoginSignUp>
      <Logout />
    </StyledOptions>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openRegisterView: () => dispatch(openRegisterViewAction()),
  openLoginView: () => dispatch(openLoginViewAction()),
  hideCommunicatorIcon: () => dispatch(hideCommunicatorIconAction()),
});

export default connect(null, mapDispatchToProps)(Options);

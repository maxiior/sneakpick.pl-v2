import Option from "components/Nav/Options/Option";
import styled from "styled-components";
import LoggedPanel from "components/Nav/Options/LoggedPanel";
import { routes } from "routes";
import { openRegisterView, openLoginView } from "store/interface/actions";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { resetAllStates } from "store/filters/actions";
import { useNavigate } from "react-router-dom";
import { onResetFilters } from "functions/onResetFilters";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  z-index: 100;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: none;
  }
`;

const Button = styled.div`
  margin: 0 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
  cursor: pointer;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: none;
  }
`;

const Options = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Option
        text="WTB"
        to={routes.WTB + routes.DEFAULT_SEARCH}
        onClick={() => {
          dispatch(resetAllStates());
          onResetFilters(navigate);
        }}
        popup
      />
      <Option text="WTS" to={routes.WTS} popup />
      <Option text="WTT" to={routes.WTT} />
      <Option text="PROXY" to={routes.PROXY} />
      <Option text="STEAL" to={routes.STEAL} />
      <Option text="TALK" to={routes.TALK_DEFAULT_SEARCH} />
      {!isAuthenticated ? (
        <>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(openLoginView());
            }}
          >
            LOGIN
          </Button>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(openRegisterView());
            }}
          >
            SIGN UP
          </Button>
        </>
      ) : (
        <LoggedPanel />
      )}
    </Wrapper>
  );
};

export default Options;

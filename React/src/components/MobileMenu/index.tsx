import styled from "styled-components";
import useResizeObserver from "@react-hook/resize-observer";
import logo from "assets/logo.png";
import Option from "components/MobileMenu/Option";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { IoMdClose } from "react-icons/io";
import {
  closeMenuView,
  openRegisterView,
  openLoginView,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { useDispatch } from "react-redux";
import { useState, useLayoutEffect, useRef } from "react";
import { useAppSelector } from "hooks/useAppSelector";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.black};
  z-index: 1001;
  top: 0;
  padding-bottom: 40px;

  ::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (min-width: ${({ theme }) => theme.min_width_LG}) {
    display: none;
  }
`;

const Header = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Close = styled(IoMdClose)`
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  position: absolute;
  right: 20px;
  font-size: 30px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Logo = styled.img`
  width: 121px;
  height: 44px;
  cursor: pointer;
`;

const OptionsHolder = styled.div`
  padding: 15px 0;
`;

const ButtonsHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 40px;
`;

const Button = styled.div<{ dark?: boolean }>`
  width: 47%;
  background-color: ${({ theme, dark }) =>
    dark ? theme.veryDarkGrey : theme.blue};
  padding: 10px 0;
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme._5px};
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    opacity: 0.9;
  }
`;

const MobileMenu = ({ className }: { className?: any }) => {
  const dispatch = useDispatch();
  const target = useRef<HTMLDivElement>(null);
  const auth = useAppSelector((state) => state.authSlice);

  const useSize = (target: any) => {
    const [size, setSize] = useState();

    useLayoutEffect(() => {
      setSize(target.current.getBoundingClientRect());
    }, [target]);

    useResizeObserver(target, (entry: any) => setSize(entry.contentRect));
    return size;
  };

  const size: any = useSize(target);

  if (size?.width === 0) {
    dispatch(displayCommunicatorIcon());
    dispatch(closeMenuView());
  }

  return (
    <Wrapper className={className} ref={target}>
      <Header>
        <Close
          onClick={() => {
            dispatch(displayCommunicatorIcon());
            dispatch(closeMenuView());
          }}
        />
        <Link to={routes.HOME}>
          <Logo
            src={logo}
            onClick={() => {
              dispatch(displayCommunicatorIcon());
              dispatch(closeMenuView());
            }}
          />
        </Link>
      </Header>
      <OptionsHolder
        onClick={() => {
          dispatch(displayCommunicatorIcon());
          dispatch(closeMenuView());
        }}
      >
        {auth.isAuthenticated && (
          <>
            <Option
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", auth.user_id)}
              content="Mój profil"
            />
            <Option to={routes.ORDERS} content="Zamówienia" />
            <Option to={routes.FOLLOWED} content="Obserwowane" />
            <Option to="" content="Powiadomienia" />
          </>
        )}
        <Option content="WTB" to={routes.WTB + routes.DEFAULT_SEARCH} />
        <Option content="WTS" to={routes.WTS} />
        <Option content="WTT" to={routes.WTT} />
        <Option content="PROXY" to={routes.PROXY} />
        <Option content="STEAL" to={routes.STEAL} />
        <Option content="TALK" to={routes.TALK} />
        <Option content="Pomoc i kontakt" to={routes.SUPPORT} />
        <Option content="FAQ" to={routes.FAQ} />
        {auth.isAuthenticated && (
          <>
            <Option content="Ustawienia" to={routes.PROFILE_SETTINGS} />
            <Option content="Wyloguj się" to={routes.HOME} logout />
          </>
        )}
      </OptionsHolder>
      {!auth.isAuthenticated && (
        <ButtonsHolder>
          <Button
            onClick={() => {
              dispatch(openLoginView());
              dispatch(closeMenuView());
            }}
          >
            LOGIN
          </Button>
          <Button
            onClick={() => {
              dispatch(openRegisterView());
              dispatch(closeMenuView());
            }}
            dark
          >
            SIGN UP
          </Button>
        </ButtonsHolder>
      )}
    </Wrapper>
  );
};

export default MobileMenu;

import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import useResizeObserver from "@react-hook/resize-observer";
import { Link } from "react-router-dom";
import logo from "assets/logo_dark.png";
import { routes } from "routes";
import { IoMdClose } from "react-icons/io";
import {
  closeMenuView,
  openRegisterView,
  openLoginView,
  displayCommunicatorIcon,
  hideCommunicatorIcon,
} from "store/interface/actions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.white};
  z-index: 1000;
  top: 0;
  padding-bottom: 84px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }

  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

const Option = styled(Link)`
  color: ${({ theme }) => theme.blue};
  width: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;

  :hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 22px;
  cursor: pointer;
`;

const LogoHolder = styled(Link)``;

const ButtonHolder = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.whie};
  justify-content: space-between;
  padding: 0 40px;
`;

const Button = styled.div`
  width: 47%;
  text-align: center;
  background-color: ${({ theme, dark }) =>
    dark ? theme.veryDarkGrey : theme.blue};
  padding: 10px 0;
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const Close = styled(IoMdClose)`
  cursor: pointer;
  color: ${({ theme }) => theme.veryDarkGrey};
  position: absolute;
  right: 20px;
  font-size: 30px;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OptionsHolder = styled.div`
  padding: 30px 0;
`;

const useSize = (target) => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

const Menu = ({ className }) => {
  const target = useRef(null);
  const size = useSize(target);
  const dispatch = useDispatch();

  if (size?.width === 0) {
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
        <LogoHolder to={routes.HOME}>
          <Logo src={logo} onClick={() => dispatch(closeMenuView())} />
        </LogoHolder>
      </Header>
      <OptionsHolder
        onClick={() => {
          dispatch(displayCommunicatorIcon());
          dispatch(closeMenuView());
        }}
      >
        <Option to={routes.WTB}>WTB</Option>
        <Option to={routes.WTS}>WTS</Option>
        <Option to={routes.WTT}>WTT</Option>
        <Option to={routes.PROXY}>PROXY</Option>
        <Option to={routes.STEAL}>STEAL</Option>
        <Option to={routes.TALK}>TALK</Option>
      </OptionsHolder>
      <ButtonHolder>
        <Button
          onClick={() => {
            dispatch(openLoginView());
            dispatch(closeMenuView());
            dispatch(hideCommunicatorIcon());
          }}
        >
          LOGIN
        </Button>
        <Button
          onClick={() => {
            dispatch(openRegisterView());
            dispatch(closeMenuView());
            dispatch(hideCommunicatorIcon());
          }}
          dark
        >
          SIGN UP
        </Button>
      </ButtonHolder>
    </Wrapper>
  );
};

export default Menu;

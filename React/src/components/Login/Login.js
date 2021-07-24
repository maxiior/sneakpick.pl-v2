import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  padding: 50px 80px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  display: block;
  border: 1px solid #d6d6d6;
  outline: none;
  width: 250px;

  :focus {
    border: 1px solid #00b4ff;
    color: #00b4ff;
  }
`;

const LoginButton = styled.div`
  background-color: ${({ facebook }) => (facebook ? "#4c69ba" : "#191919")};
  color: white;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
`;

const FieldType = styled.div`
  font-size: 12px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const PasswordForgotten = styled.span`
  font-size: 12px;
  padding-bottom: 2px;
  padding-top: 2px;
  cursor: pointer;

  :hover {
    color: #00b4ff;
  }
`;

const CLose = styled(IoMdClose)`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
  color: #191919;

  :hover {
    color: #00b4ff;
  }
`;

const Login = ({ setLoginView }) => {
  return (
    <Wrapper>
      <Container>
        <CLose onClick={() => setLoginView(false)} />
        <Header>SNEAKPICK</Header>
        <FieldType>Email</FieldType>
        <StyledInput type="text" />
        <FieldType>Hasło</FieldType>
        <StyledInput type="password" />
        <PasswordForgotten>Zapomniałeś hasła?</PasswordForgotten>
        <LoginButton>LOGIN</LoginButton>
        <LoginButton facebook>LOGIN WITH FACEBOOK</LoginButton>
      </Container>
    </Wrapper>
  );
};

export default Login;

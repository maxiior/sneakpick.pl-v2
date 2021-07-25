import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import logo from "assets/logo_dark.png";

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

const Logo = styled.img`
  width: 150px;
  height: 22px;
`;

const LogoHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FieldType = styled.div`
  font-size: 12px;
  padding-bottom: 2px;
  margin-top: 15px;
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

const Register = ({ setRegisterView }) => {
  return (
    <Wrapper>
      <Container>
        <CLose onClick={() => setRegisterView(false)} />
        <LogoHolder>
          <Logo src={logo} />
        </LogoHolder>
        <FieldType>Imię</FieldType>
        <StyledInput type="text" />
        <FieldType>Nazwisko</FieldType>
        <StyledInput type="text" />
        <FieldType>Miasto</FieldType>
        <StyledInput type="text" />
        <FieldType>Email</FieldType>
        <StyledInput type="text" />
        <FieldType>Hasło</FieldType>
        <StyledInput type="password" />
        <FieldType>Powtórz hasło</FieldType>
        <StyledInput type="password" />
        <FormControlLabel
          control={
            <Checkbox
              checked={false}
              onChange={null}
              name="checkedB"
              color="primary"
            />
          }
          label="Akceptuję warunki regulaminu."
        />
        <LoginButton>SIGN UP</LoginButton>
        <LoginButton facebook>LOGIN WITH FACEBOOK</LoginButton>
      </Container>
    </Wrapper>
  );
};

export default Register;
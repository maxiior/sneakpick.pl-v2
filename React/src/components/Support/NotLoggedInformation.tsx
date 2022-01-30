import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { openLoginView, openRegisterView } from "store/interface/actions";

const Wrapper = styled.div`
  width: 50%;
`;

const Information = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const Holder = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.div<{ signup?: boolean }>`
  background-color: ${({ theme, signup }) =>
    signup ? theme.white : theme.black};
  color: ${({ theme, signup }) => (signup ? theme.black : theme.white)};
  border: ${({ theme, signup }) => signup && `1px solid ${theme.black}`};
  padding: 10px;
  cursor: pointer;
  width: 150px;
  text-align: center;
  margin-left: 10px;
  font-weight: 500;

  :first-child {
    margin-left: 0;
  }
`;

const NotLoggedInformation: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Information>Zaloguj się, aby się z nami skontaktować.</Information>
      <Holder>
        <Button signup onClick={() => dispatch(openRegisterView())}>
          Sign Up
        </Button>
        <Button onClick={() => dispatch(openLoginView())}>Login</Button>
      </Holder>
    </Wrapper>
  );
};

export default NotLoggedInformation;

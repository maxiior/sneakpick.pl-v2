import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 50%;
`;

const Information = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const Button = styled.div<{ signup?: Boolean }>`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  width: 120px;
  text-align: center;
  margin-left: 10px;
  font-weight: 500;

  :first-child {
    margin-left: 0;
  }

  ${({ signup }) =>
    signup &&
    css`
      background-color: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.black};
      border: 1px solid ${({ theme }) => theme.black};
    `}
`;

const Holder = styled.div`
  display: flex;
  margin-top: 10px;
`;

const NotLoggedInformation: React.FC = () => {
  return (
    <Wrapper>
      <Information>Zaloguj się, aby się z nami skontaktować.</Information>
      <Holder>
        <Button signup>Sign Up</Button>
        <Button>Login</Button>
      </Holder>
    </Wrapper>
  );
};

export default NotLoggedInformation;

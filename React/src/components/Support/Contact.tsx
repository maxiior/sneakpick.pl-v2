import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
`;

const Header = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const Paragraph = styled.div`
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: 15px;
`;

const Description = styled.textarea`
  padding: 10px 12px;
  display: block;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  outline: none;
  width: 100%;
  resize: none;
  height: 200px;

  ::-webkit-scrollbar {
    cursor: default;
    width: 10px;
  }

  ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.grey};
      cursor: default;
  }

  ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.blue};
      cursor: default;
  }

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
  }
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-weight: 500;
  margin-top: 10px;

  :hover {
    opacity: 0.9;
  }
`;

const Contact: React.FC = () => {
  return (
    <Wrapper>
      <Header>Skontaktuj się z nami</Header>
      <Paragraph>Opisz problem</Paragraph>
      <Description placeholder="Opisz problem"/>
      <Button>Wyślij</Button>
    </Wrapper>
  );
};

export default Contact;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { routes } from "routes";

const Wrapper = styled.div`
  width: 20%;
  padding: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: none;
  }
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  padding: 12px 30px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  :hover {
    opacity: 0.9;
  }
`;

const PlusIcon = styled(BiPlus)`
  font-size: 22px;
`;

const RightPanel = () => {
  return (
    <Wrapper>
      <Button to={routes.ADD_QUESTION}>
        <PlusIcon />
        <div>Dodaj pytanie</div>
      </Button>
    </Wrapper>
  );
};

export default RightPanel;

import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { talkCategories } from "constants/talkCategories";

const Wrapper = styled.div`
  padding: 20px;
  width: 20%;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: none;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
`;

const Categories = () => {
  return (
    <Wrapper>
      <Header>Kategorie</Header>
      {talkCategories.map((e) => (
        <Option
          fullname={e.fullname}
          name={e.name}
          color={e.color}
          icon={<e.icon />}
        />
      ))}
    </Wrapper>
  );
};

export default Categories;

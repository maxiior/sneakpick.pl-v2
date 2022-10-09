import React from "react";
import styled from "styled-components";
import Option from "./Option";

import { colorwaysTheme } from "theme/ColorwaysTheme";
import { talkCategories } from "constants/talkCategories";

const Wrapper = styled.div`
  padding: 20px;
  width: 20%;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
`;

const Categories = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Function;
}) => {
  return (
    <Wrapper>
      <Header>Kategorie</Header>
      {talkCategories.map((e) => (
        <Option
          fullname={e.fullname}
          name={e.name}
          color={e.color}
          icon={<e.icon />}
          setCategory={setCategory}
          category={category}
        />
      ))}
    </Wrapper>
  );
};

export default Categories;

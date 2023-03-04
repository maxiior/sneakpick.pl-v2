import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { talkCategories } from "constants/talkCategories";
import Tag from "./Tag";

const Wrapper = styled.div`
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  user-select: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: block;
    text-align: center;
  }

  :last-child {
    margin-top: 10px;
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: ${({ theme }) => theme.min_width_LG}) {
    display: none;
  }

  :last-child {
    margin-top: 10px;
  }
`;

const Navigation = () => {
  const orderingOptions = [
    "Najnowsze",
    "Najwyżej bumpowane",
    "Najpopularniejsze",
  ];

  return (
    <Wrapper>
      <div>
        <Container>
          {orderingOptions.map((e, i) => (
            <Option name={e} id={i} />
          ))}
        </Container>
        <Categories>
          {talkCategories.map((e) => (
            <Tag color={e.color} name={e.name} />
          ))}
        </Categories>
      </div>
    </Wrapper>
  );
};

export default Navigation;

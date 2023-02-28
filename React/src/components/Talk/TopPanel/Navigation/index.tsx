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

const Container = styled.div<{ categories?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: ${({ theme }) => theme.min_width_LG}) {
    display: ${({ categories }) => categories && "none"};
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
        <Container categories>
          {talkCategories.map((e) => (
            <Tag color={e.color} name={e.name} />
          ))}
        </Container>
      </div>
    </Wrapper>
  );
};

export default Navigation;

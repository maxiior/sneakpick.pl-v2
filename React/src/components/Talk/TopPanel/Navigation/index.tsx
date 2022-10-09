import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { talkCategories } from "constants/talkCategories";

const Wrapper = styled.div`
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  :last-child {
    margin-top: 10px;
  }
`;

const Tag = styled.div<{ color: string; active: boolean }>`
  background-color: ${({ color }) => color};
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  filter: ${({ active }) => (active ? "opacity(100%)" : "opacity(40%)")};
  cursor: pointer;
  user-select: none;
  margin-right: 10px;

  :hover {
    filter: opacity(100%);
  }
  :last-child {
    margin-right: 0;
  }
`;

const Navigation = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Function;
}) => {
  return (
    <Wrapper>
      <div>
        <Container>
          <Option name={"Najnowsze"} />
          <Option name={"Najwyżej bumpowane"} />
          <Option name={"Najpopularniejsze"} />
        </Container>
        <Container>
          {talkCategories.map((e) => (
            <Tag
              active={e.name === category}
              color={e.color}
              onClick={() => setCategory(category === e.name ? "" : e.name)}
            >
              {e.name}
            </Tag>
          ))}
        </Container>
      </div>
    </Wrapper>
  );
};

export default Navigation;

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  user-select: none;
`;

const Name = styled.div<{ active: boolean }>`
  font-size: 16px;
  padding: 10px;
  filter: ${({ active }) => (active ? "opacity(100%)" : "opacity(40%)")};
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const Holder = styled.div`
  cursor: pointer;
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5px;
`;

const Option = ({
  fullname,
  name,
  icon,
  color,
  category,
  setCategory,
}: {
  fullname: string;
  name: string;
  icon?: any;
  color: string;
  category: string;
  setCategory: Function;
}) => {
  return (
    <Wrapper
      color={color}
      onClick={() => setCategory(category === name ? "" : name)}
    >
      <Holder>
        <Name active={category === name}>
          <Icon>{icon}</Icon>
          <div>{fullname}</div>
        </Name>
      </Holder>
    </Wrapper>
  );
};

export default Option;

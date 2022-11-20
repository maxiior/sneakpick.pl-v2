import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { onTalkFilterClick } from "functions/onTalkFilterClick";

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
}: {
  fullname: string;
  name: string;
  icon?: any;
  color: string;
}) => {
  const [searchParams, setsearchParams] = useSearchParams();

  return (
    <Wrapper
      color={color}
      onClick={() => {
        onTalkFilterClick("category", name, searchParams, setsearchParams);
      }}
    >
      <Holder>
        <Name active={searchParams.get("category") === name}>
          <Icon>{icon}</Icon>
          <div>{fullname}</div>
        </Name>
      </Holder>
    </Wrapper>
  );
};

export default Option;

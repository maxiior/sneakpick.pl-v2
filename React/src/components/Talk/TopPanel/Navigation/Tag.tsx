import styled from "styled-components";
import { onTalkFilterClick } from "functions/onTalkFilterClick";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div<{ color: string; active: boolean }>`
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

const Tag = ({ name, color }: { name: string; color: string }) => {
  const [searchParams, setsearchParams] = useSearchParams();

  return (
    <Wrapper
      active={searchParams.get("category") === name}
      color={color}
      onClick={() => {
        onTalkFilterClick("category", name, searchParams, setsearchParams);
      }}
    >
      {name !== "other" ? name.toUpperCase() : "Inne"}
    </Wrapper>
  );
};

export default Tag;

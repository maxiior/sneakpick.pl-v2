import styled from "styled-components";
import { onTalkFilterClick } from "functions/onTalkFilterClick";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  margin-right: 20px;

  :last-child {
    margin: 0;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const Holder = styled.div<{ active: boolean }>`
  cursor: pointer;
  color: ${({ theme, active }) => active && theme.blue};
`;

const Option = ({ name, id }: { name: string; id: number }) => {
  const [searchParams, setsearchParams] = useSearchParams();

  return (
    <Wrapper>
      <Holder
        active={id === parseInt(searchParams.get("ordering")!)}
        onClick={() => {
          onTalkFilterClick(
            "ordering",
            id.toString(),
            searchParams,
            setsearchParams
          );
        }}
      >
        <Name>{name}</Name>
      </Holder>
    </Wrapper>
  );
};

export default Option;

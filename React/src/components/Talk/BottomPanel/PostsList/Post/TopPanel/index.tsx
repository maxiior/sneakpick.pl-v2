import styled from "styled-components";
import { IPost } from "../types/post";
import Photo from "./Photo";
import Content from "./Content";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  margin-bottom: 15px;
  display: flex;
`;

const TopPanel = ({ data }: { data: IPost }) => {
  return (
    <Wrapper>
      <Photo data={data} />
      <Content data={data} />
    </Wrapper>
  );
};

export default TopPanel;
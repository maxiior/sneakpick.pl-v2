import styled from "styled-components";
import ItemsList from "components/Home/BottomPanel/ItemsSection/ItemsList";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;

  :first-child {
    margin-top: 0;
  }
`;

const TopPanel = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 20px;
`;

const ShowAll = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  margin-left: 10px;
`;

interface iProps {
  header: String;
  link: string;
}

const ItemsSection = ({ header, link }: iProps) => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>{header}</Header>
        <ShowAll to={link}>Zobacz wszystkie</ShowAll>
      </TopPanel>
      <ItemsList />
    </Wrapper>
  );
};

export default ItemsSection;

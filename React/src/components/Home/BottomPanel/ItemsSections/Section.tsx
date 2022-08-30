import styled from "styled-components";
import ItemsList from "components/Home/BottomPanel/ItemsSections/ItemsList";
import { Link } from "react-router-dom";
import { iSection } from "types/Home/section";

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

const Button = styled(Link)`
  font-size: ${({ theme }) => theme.font_size_MD};
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  margin-left: 10px;
`;

const Section = ({ header, items, to }: iSection) => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>{header}</Header>
        <Button to={to}>Zobacz wszystkie</Button>
      </TopPanel>
      <ItemsList items={items} />
    </Wrapper>
  );
};

export default Section;

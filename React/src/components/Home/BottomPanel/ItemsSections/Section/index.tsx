import ItemsList from "./ItemsList";
import { iSection } from "./types";
import { Wrapper, TopPanel, Header, Button } from "./styled";

const Section = ({ header, items, to, pending }: iSection) => {
  return (
    <Wrapper>
      <TopPanel>
        <Header>{header}</Header>
        <Button to={to}>Zobacz wszystko</Button>
      </TopPanel>
      <ItemsList items={items} pending={pending} />
    </Wrapper>
  );
};

export default Section;

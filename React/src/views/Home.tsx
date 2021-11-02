import styled from "styled-components";
import TopPanel from "components/Home/TopPanel";
import BottomPanel from "components/Home/BottomPanel";

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel />
    </Wrapper>
  );
};

export default Home;

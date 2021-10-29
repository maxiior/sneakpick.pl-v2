import styled from "styled-components";
import TopPanel from "components/Home/TopPanel";

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <TopPanel />
    </Wrapper>
  );
};

export default Home;

import React from "react";
import styled from "styled-components";
import Contact from "components/Support/Contact";
import NotLoggedInformation from "components/Support/NotLoggedInformation";
import TopPanel from "components/Support/TopPanel";

const Wrapper = styled.div`
  width: 100%;
  user-select: none;
`;

const BottomPanel = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const Container = styled.div`
  width: 80%;
`;

const Support: React.FC = () => {
  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel>
        <Container>
          <NotLoggedInformation />
          <Contact />
        </Container>
      </BottomPanel>
    </Wrapper>
  );
};

export default Support;

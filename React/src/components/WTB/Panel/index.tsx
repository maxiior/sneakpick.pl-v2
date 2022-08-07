import LeftPanel from "components/WTB/Panel/LeftPanel";
import RightPanel from "components/WTB/RightPanel";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Panel = () => {
  return (
    <Wrapper>
      <LeftPanel />
      <RightPanel />
    </Wrapper>
  );
};

export default Panel;

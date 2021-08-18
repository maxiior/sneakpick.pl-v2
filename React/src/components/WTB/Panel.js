import LeftPanel from "components/WTB/LeftPanel";
import RightPanel from "components/WTB/RightPanel";
import styled from "styled-components";

const StyledPanel = styled.div`
  position: relative;
  height: 100%;
`;

const Panel = () => {
  return (
    <StyledPanel>
      <LeftPanel />
      <RightPanel />
    </StyledPanel>
  );
};

export default Panel;

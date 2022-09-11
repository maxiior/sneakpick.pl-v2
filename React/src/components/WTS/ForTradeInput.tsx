import Checkbox from "./Checkbox";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 0 0 5px;
`;

const ForTradeInput = () => {
  return (
    <Wrapper>
      <Checkbox name="Item podlega wymianie (WTT)" type="for_trade" />
    </Wrapper>
  );
};

export default ForTradeInput;

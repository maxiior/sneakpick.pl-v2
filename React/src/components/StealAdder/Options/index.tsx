import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";

const CheckboxHolder = styled.div`
  margin-top: 20px;
`;

const Options = () => {
  return (
    <CheckboxHolder>
      <Checkbox name="alert" />
      <Checkbox name="rocket" />
    </CheckboxHolder>
  );
};

export default Options;

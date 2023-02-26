import styled from "styled-components";
import ComboBox from "./ComboBox";
import { useFormContext } from "react-hook-form";

const StyledInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Wrapper = styled.div`
  margin-top: 20px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Holder = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const NumberInput = () => {
  const { register } = useFormContext();
  const validator = register("markdown");

  return (
    <Wrapper>
      <Header>Zniżka</Header>
      <Holder>
        <StyledInput
          autoComplete="off"
          type="number"
          maxLength={100}
          {...validator}
          step="0.01"
          placeholder="np. -249.99PLN lub -30%"
        />
        <ComboBox />
      </Holder>
    </Wrapper>
  );
};

export default NumberInput;

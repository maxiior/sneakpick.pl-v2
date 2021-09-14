import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useRef, useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const StyledInput = styled.input`
  outline: none;
  width: 300px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Error = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: ${({ statute }) => (statute ? "-10px" : "3px")};
  margin-bottom: ${({ statute }) => (statute ? "15px" : "0")};
  width: 250px;
  font-weight: 500;
  position: absolute;
`;

const Header = styled.div``;

const Container = styled.div`
  position: relative;
`;

const DataBlock = ({ header, value, name, placeholder, className }) => {
  const { register, formState } = useFormContext();
  const validator = register(name);

  const inputEl = useRef(null);

  useEffect(() => {
    console.log(inputEl);
  }, []);

  return (
    <Wrapper className={className}>
      <Header>{header}</Header>
      <Container>
        <StyledInput
          ref={inputEl}
          name={name}
          autoComplete="off"
          maxLength={100}
          value={value}
          onChange={(e) => {
            validator.onChange(e);
            console.log(e);
          }}
          placeholder={placeholder}
          error={formState.errors[name]}
        />
        {formState.errors[name] && (
          <Error>{formState.errors[name].message}</Error>
        )}
      </Container>
    </Wrapper>
  );
};

export default DataBlock;

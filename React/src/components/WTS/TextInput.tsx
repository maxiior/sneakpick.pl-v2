import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changeState } from "store/creator/actions";
import { Error } from "components/WTS/Error";
import Header from "components/WTS/Header";

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Holder = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input<{ error?: Boolean }>`
  outline: none;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.red : theme.grey)};
  padding: 5px 12px;
  color: ${({ theme }) => theme.darkGrey};

  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.blue};
  }
`;

interface iTextInput {
  title: string;
  name: string;
  placeholder: string;
  filterType: string;
}

const TextInput = ({ title, name, placeholder, filterType }: iTextInput) => {
  const { register, formState } = useFormContext();
  const validator = register(name);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Header>{title}</Header>
      <Container>
        <Holder>
          <Input
            autoComplete="off"
            type="text"
            maxLength={100}
            error={formState.errors[name]}
            placeholder={placeholder}
            {...register(name)}
            onChange={(e) => {
              validator.onChange(e);
              dispatch(
                changeState({
                  type: filterType,
                  id: e.target.value,
                  input: "text",
                })
              );
            }}
          />
        </Holder>
      </Container>
      {formState.errors[name] && (
        <Error>{formState.errors[name].message}</Error>
      )}
    </Wrapper>
  );
};

export default TextInput;

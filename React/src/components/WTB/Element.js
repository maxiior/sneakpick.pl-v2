import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { onFilterClick } from "functions/onFilterClick";

const StyledElement = styled.div`
  margin: 2px 0;
  display: block;
  font-size: 14px;
`;

const Checkbox = styled.div`
  margin-right: 5px;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ theme }) => theme.lightGrey};
`;

const Type = styled.div`
  padding: 5px 0;

  ${({ other }) =>
    other &&
    css`
      color: ${({ theme }) => theme.blue};
      font-weight: 600;
      margin: 2px 0;
    `}
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  :checked + ${Checkbox} {
    background-color: ${({ theme }) => theme.blue};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.white};
  }
`;

const Element = ({ text, filterType, checked }) => {
  const history = useHistory();

  return (
    <StyledElement>
      <StyledLabel>
        <StyledInput
          type="checkbox"
          onChange={() =>
            onFilterClick(filterType.name, text, filterType.input, history)
          }
          checked={checked.includes(text)}
        />
        <Checkbox />
        <Type other={text === "Inne"}>{text}</Type>
      </StyledLabel>
    </StyledElement>
  );
};

export default Element;

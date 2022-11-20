import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { onFilterClick } from "functions/onFilterClick";
import { firstLetterUppercase } from "functions/firstLetterUppercase";

const StyledElement = styled.div`
  margin: 2px 0;
  display: block;
  font-size: ${({ theme }) => theme.font_size_MD};
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
  const navigate = useNavigate();

  return (
    <StyledElement>
      <StyledLabel>
        <StyledInput
          type="checkbox"
          onChange={() =>
            onFilterClick(filterType.name, text, filterType.input, navigate)
          }
          checked={checked.includes(text)}
        />
        <Checkbox />
        <Type other={text === "inne"}>{firstLetterUppercase(text)}</Type>
      </StyledLabel>
    </StyledElement>
  );
};

export default Element;

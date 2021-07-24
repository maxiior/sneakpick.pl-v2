import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";

const GridElements = styled.div`
  display: grid;
  margin-top: 5px;
  grid-gap: 5px;

  ${({ small }) =>
    small &&
    css`
      grid-template-columns: auto auto auto;
    `}
  ${({ medium }) =>
    medium &&
    css`
      grid-template-columns: auto auto;
    `}
  ${({ large }) =>
    large &&
    css`
      wgrid-template-columns: auto;
    `}
`;

const Value = styled.span`
  display: flex;
  border: 1px solid #ddd;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  color: #ddd;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;

  ${({ small }) =>
    small &&
    css`
      width: 60px;
    `}
  ${({ medium }) =>
    medium &&
    css`
      width: 92.5px;
    `}
  ${({ large }) =>
    large &&
    css`
      width: 190px;
    `}
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;

  :checked ~ ${Value} {
    border-color: #191919;
    color: white;
    background-color: #191919;
  }
`;

const GridList = ({ name, elements, onToggle, setChecked, ...props }) => {
  return (
    <Elements>
      <Paragraph>{name}</Paragraph>
      <GridElements {...props}>
        {elements.map((e, i) => (
          <StyledLabel key={i}>
            <StyledInput
              type="checkbox"
              onChange={() => onToggle(setChecked, elements, e.text)}
              checked={e.checked}
            />
            <Value {...props}>{e.text}</Value>
          </StyledLabel>
        ))}
      </GridElements>
    </Elements>
  );
};

export default GridList;

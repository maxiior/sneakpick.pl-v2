import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { onFilterClick } from "functions/onFilterClick";

const GridElements = styled.div<{
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  mobile: boolean;
}>`
  display: grid;
  margin-top: 5px;
  grid-gap: 5px;

  grid-template-columns: ${({ small }) => small && "auto auto auto"};
  grid-template-columns: ${({ mobile, medium }) =>
    medium && (mobile ? "auto auto auto auto" : "auto auto")};
  grid-template-columns: ${({ mobile, large }) =>
    large && (mobile ? "auto auto" : "auto")};
  width: ${({ mobile }) => mobile && "305px"};
`;

const Value = styled.span<{
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  mobile: boolean;
}>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.grey};
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.grey};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;

  width: ${({ small }) => small && "60px"};
  width: ${({ mobile, medium }) => medium && (mobile ? "72.5px" : "92.5px")};
  width: ${({ mobile, large }) => large && (mobile ? "150px" : "190px")};
`;

const Label = styled.label`
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  :checked ~ ${Value} {
    border-color: ${({ theme }) => theme.veryDarkGrey};
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.veryDarkGrey};
  }
`;

const GridList = ({
  name,
  elements,
  filterType,
  mobile,
  currentFilter,
  ...props
}: any) => {
  const history = useHistory();

  return (
    <Elements mobile={mobile}>
      <div>
        <Paragraph mobile={mobile}>{name}</Paragraph>
        <GridElements mobile={mobile} {...props}>
          {elements.map((e: any) => (
            <Label key={e.id}>
              <Input
                type="checkbox"
                onChange={() =>
                  onFilterClick(
                    filterType.name,
                    e.text,
                    filterType.input,
                    history
                  )
                }
                checked={currentFilter.includes(e.text)}
              />
              <Value mobile={mobile} {...props}>
                {e.text.toUpperCase()}
              </Value>
            </Label>
          ))}
        </GridElements>
      </div>
    </Elements>
  );
};

export default GridList;

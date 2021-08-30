import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/filters";

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
      grid-template-columns: ${({ mobile }) =>
        mobile ? "auto auto auto auto" : "auto auto"};
    `}
  ${({ large }) =>
    large &&
    css`
      grid-template-columns: ${({ mobile }) => (mobile ? "auto auto" : "auto")};
    `}
  ${({ mobile }) =>
    mobile &&
    css`
      width: 305px;
    `}
`;

const Value = styled.span`
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

  ${({ small }) =>
    small &&
    css`
      width: 60px;
    `}
  ${({ medium }) =>
    medium &&
    css`
      width: ${({ mobile }) => (mobile ? "72.5px" : "92.5px")};
    `}
  ${({ large }) =>
    large &&
    css`
      width: ${({ mobile }) => (mobile ? "150px" : "190px")};
    `}
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledInput = styled.input`
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
  changeState,
  filterType,
  mobile,
  ...props
}) => {
  return (
    <Elements mobile={mobile}>
      <div>
        <Paragraph mobile={mobile}>{name}</Paragraph>
        <GridElements mobile={mobile} {...props}>
          {elements.map((e) => (
            <StyledLabel key={e.id}>
              <StyledInput
                id={e.id}
                type="checkbox"
                onChange={() => changeState(filterType, e.id)}
                checked={e.checked}
              />
              <Value mobile={mobile} {...props}>
                {e.text}
              </Value>
            </StyledLabel>
          ))}
        </GridElements>
      </div>
    </Elements>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id) => dispatch(changeStateAction(filterType, id)),
});

export default connect(null, mapDispatchToProps)(GridList);

import colorful from "assets/other.png";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/filters";
import { colorwaysTheme } from "theme/ColorwaysTheme";

const CW = styled.div`
  box-sizing: border-box;
  width: 43.75px;
  height: 43.75px;
  cursor: pointer;
  position: relative;

  ${({ white }) =>
    white &&
    css`
      border: 1px solid ${({ theme }) => theme.grey};
      box-sizing: border-box;
    `}

  ${({ multi }) =>
    multi &&
    css`
      background-image: url(${colorful});
    `}
  
  ${({ mobile }) =>
    mobile &&
    css`
      width: 72.5px;
      height: 72.5px;
    `}
`;

const Checkmark = styled.div`
  ${({ white }) =>
    white &&
    css`
      border-color: ${({ theme }) => theme.grey} !important;
    `}
`;

const CwsGrid = styled.div`
  display: grid;
  margin-top: 5px;
  grid-gap: 5px;
  grid-template-columns: auto auto auto auto;

  ${({ mobile }) =>
    mobile &&
    css`
      width: 305px;
    `}
`;

const StyledInput = styled.input`
  display: none;

  :checked ~ ${CW} {
    opacity: 0.9;
  }

  :checked ~ ${CW} ${Checkmark} {
    content: "";
    height: 6px;
    width: 14px;
    border-left: 2px solid ${({ theme }) => theme.white};
    border-bottom: 2px solid ${({ theme }) => theme.white};
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    top: 45%;
    left: 50%;
  }
`;

const ColorwayGrid = ({
  colors,
  changeState,
  filterType,
  mobile,
  borderNone,
  currentFilter,
}) => {
  return (
    <Elements mobile={mobile} borderNone={borderNone}>
      <div>
        <Paragraph mobile={mobile}>CW</Paragraph>
        <CwsGrid mobile={mobile}>
          {colors.map((c) => (
            <label key={c.id}>
              <StyledInput
                type="checkbox"
                onChange={() => changeState(filterType, c.text, "checkbox")}
                checked={currentFilter.includes(c.text)}
              />
              <CW
                style={{ backgroundColor: colorwaysTheme[c.text] }}
                white={c.text === "white"}
                multi={c.text === "multi"}
                mobile={mobile}
              >
                <Checkmark white={c.text === "white"}></Checkmark>
              </CW>
            </label>
          ))}
        </CwsGrid>
      </div>
    </Elements>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(ColorwayGrid);

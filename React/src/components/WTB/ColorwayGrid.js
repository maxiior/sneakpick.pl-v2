import colorful from "assets/other.png";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { changeState as changeStateAction } from "actions/filters";

const CW = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
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
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto;
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

const ColorwayGrid = ({ colors, changeState, filterType }) => {
  return (
    <Elements>
      <Paragraph>CW</Paragraph>
      <CwsGrid>
        {colors.map((c) => (
          <label key={c.id}>
            <StyledInput
              type="checkbox"
              onChange={() => changeState(filterType, c.id)}
              checked={c.checked}
            />
            <CW
              style={{ backgroundColor: c.text }}
              white={c.text === "#FFFFFF"}
              multi={c.text === "multi"}
            >
              <Checkmark white={c.text === "#FFFFFF"}></Checkmark>
            </CW>
          </label>
        ))}
      </CwsGrid>
    </Elements>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id) => dispatch(changeStateAction(filterType, id)),
});

export default connect(null, mapDispatchToProps)(ColorwayGrid);

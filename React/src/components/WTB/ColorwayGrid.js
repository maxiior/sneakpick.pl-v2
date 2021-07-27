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
      border: 1px solid #ddd;
      box-sizing: border-box;
    `}
`;

const Checkmark = styled.div``;

const CwsGrid = styled.div`
  display: grid;
  margin-top: 5px;
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto;

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked ~ ${CW} {
    opacity: 0.9;
  }

  input[type="checkbox"]:checked ~ ${CW} ${Checkmark} {
    content: "";
    height: 6px;
    width: 14px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
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
        {colors.map((c, i) => (
          <div key={i}>
            <label>
              <input type="checkbox" />
              <CW style={{ backgroundColor: c.text }}>
                <Checkmark></Checkmark>
              </CW>
            </label>
          </div>
        ))}
        <div>
          <label>
            <input type="checkbox" />
            <CW white>
              <Checkmark style={{ borderColor: "#ddd" }}></Checkmark>
            </CW>
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" />
            <CW
              className="single-cw"
              style={{ backgroundImage: `url(${colorful})` }}
            >
              <Checkmark></Checkmark>
            </CW>
          </label>
        </div>
      </CwsGrid>
    </Elements>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id) => dispatch(changeStateAction(filterType, id)),
});

export default connect(null, mapDispatchToProps)(ColorwayGrid);

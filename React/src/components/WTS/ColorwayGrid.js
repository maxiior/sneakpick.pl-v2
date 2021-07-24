import colorful from "components/WTS/other.png";
import Header from "components/WTS/Header";
import styled, { css } from "styled-components";

const Elements = styled.div`
  width: 300px;
  margin-left: 25px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
`;

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
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto auto auto;

  input {
    display: none;
  }

  input:checked ~ ${CW} {
    opacity: 0.9;
  }

  input:checked ~ ${CW} ${Checkmark} {
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

const ColorwayGrid = ({ colors }) => {
  return (
    <div>
      <Header>CW</Header>
      <Elements>
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
    </div>
  );
};

export default ColorwayGrid;

import colorful from "assets/other.png";
import Header from "components/WTS/Header";
import styled, { css } from "styled-components";

const Elements = styled.div`
  width: 300px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`;

const CW = styled.div`
  box-sizing: border-box;
  width: 45.8px;
  height: 45.8px;
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
  grid-gap: 5px;
  grid-template-columns: auto auto auto auto auto auto;
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

const Wrapper = styled.div``;

const ColorwayGrid = ({ colors }) => {
  return (
    <Wrapper>
      <Header>CW</Header>
      <Elements>
        <CwsGrid>
          {colors.map((c, i) => (
            <label key={i}>
              <StyledInput type="radio" name="cw" />
              <CW
                style={{ backgroundColor: c.text }}
                white={c.text === "#FFFFFF"}
                multi={c.text === "multi"}
              >
                <Checkmark white={c.text === "#FFFFFF"} />
              </CW>
            </label>
          ))}
        </CwsGrid>
      </Elements>
    </Wrapper>
  );
};

export default ColorwayGrid;

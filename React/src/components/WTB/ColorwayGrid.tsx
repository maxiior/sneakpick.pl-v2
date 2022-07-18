import colorful from "assets/other.png";
import Elements from "components/WTB/Elements";
import Paragraph from "components/WTB/Paragraph";
import styled, { css } from "styled-components";
import { changeState } from "store/filters/actions";
import { useDispatch } from "react-redux";
import { colorwaysTheme } from "theme/ColorwaysTheme";

const CW = styled.div<{ mobile: boolean; white: boolean; multi: boolean }>`
  box-sizing: border-box;
  width: ${({ mobile }) => (mobile ? "72.5px" : "43.75px")};
  height: ${({ mobile }) => (mobile ? "72.5px" : "43.75px")};
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

const Checkmark = styled.div<{ white: boolean }>`
  border-color: ${({ theme, white }) => white && theme.grey} !important;
`;

const CwsGrid = styled.div<{ mobile: boolean }>`
  display: grid;
  margin-top: 5px;
  grid-gap: 5px;
  grid-template-columns: auto auto auto auto;
  width: ${({ mobile }) => mobile && "305px"};
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
  filterType,
  mobile,
  borderNone,
  currentFilter,
}: any) => {
  const dispatch = useDispatch();

  return (
    <Elements mobile={mobile} borderNone={borderNone}>
      <div>
        <Paragraph mobile={mobile}>CW</Paragraph>
        <CwsGrid mobile={mobile}>
          {colors.map((c: any) => (
            <label key={c.id}>
              <StyledInput
                type="checkbox"
                onChange={() =>
                  dispatch(
                    changeState({ filterType, id: c.text, input: "checkbox" })
                  )
                }
                checked={currentFilter.includes(c.text)}
              />
              <CW
                // @ts-ignore
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

export default ColorwayGrid;

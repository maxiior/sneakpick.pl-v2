import colorful from "assets/other.png";
import Header from "components/WTS/Header";
import styled, { css } from "styled-components";
import { changeState as changeStateAction } from "actions/WTS";
import { connect } from "react-redux";
import { colorwaysTheme } from "theme/ColorwaysTheme";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const Elements = styled.div`
  width: 300px;
  box-sizing: border-box;
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

const ColorwayGrid = ({ colors, filterType, changeState }) => {
  const { register, formState } = useFormContext();
  const validator = register("colorway");

  return (
    <Wrapper>
      <Header>
        CW
        {formState.errors.colorway && (
          <Error grid>{formState.errors.colorway.message}</Error>
        )}
      </Header>
      <Elements>
        <CwsGrid>
          {colors.map((c, i) => (
            <label key={i}>
              <StyledInput
                type="radio"
                name="colorway"
                {...register("colorway")}
                onChange={(e) => {
                  validator.onChange(e);
                  changeState(filterType, c.text, "radio");
                }}
              />
              <CW
                style={{ backgroundColor: colorwaysTheme[c.text] }}
                white={c.text === "white"}
                multi={c.text === "multi"}
              >
                <Checkmark white={c.text === "white"} />
              </CW>
            </label>
          ))}
        </CwsGrid>
      </Elements>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeState: (filterType, id, input) =>
    dispatch(changeStateAction(filterType, id, input)),
});

export default connect(null, mapDispatchToProps)(ColorwayGrid);

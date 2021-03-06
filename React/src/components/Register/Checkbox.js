import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.black};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  border-radius: 4px;

  transition: background-color 0.25s;

  ::after {
    width: 5px;
    height: 9px;
    border: solid ${({ theme }) => theme.white};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 2px;

    content: "";
    position: absolute;
    display: none;
  }
`;

const StyledInput = styled.input`
  display: none;
  cursor: pointer;

  :checked ~ ${Checkmark} {
    background-color: ${({ theme }) => theme.blue};
  }
  :checked ~ ${Checkmark}:after {
    display: block;
  }
`;

const Checkbox = ({ className, setCheckbox, checkbox }) => {
  const { register } = useFormContext();
  const statute = register("statute");
  return (
    <div className={className}>
      <Label>
        <div>
          Akceptuj{" "}
          <StyledLink target="_blank" to={routes.STATUTE}>
            regulamin strony
          </StyledLink>
          .
        </div>
        <StyledInput
          type="checkbox"
          {...statute}
          onChange={(e) => {
            statute.onChange(e);
            setCheckbox(!checkbox);
          }}
        />
        <Checkmark />
      </Label>
    </div>
  );
};

export default Checkbox;

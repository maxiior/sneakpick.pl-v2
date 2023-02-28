import { VscSearch } from "react-icons/vsc";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { resetAllStates } from "store/filters/actions";
import { useNavigate } from "react-router-dom";
import { onResetFilters } from "functions/onResetFilters";

const Wrapper = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.darkGrey};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
  width: 250px;
  height: 40px;
  border-right: 1px solid ${({ theme }) => theme.lightGrey};
  justify-content: space-between;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
`;

const Reset = styled.button`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme._5px};
  border: none;
  color: ${({ theme }) => theme.white};
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline: none;

  :hover {
    opacity: 0.9;
  }
`;

const Icon = styled(VscSearch)`
  margin-right: 5px;
  margin-top: 3px;
`;

const FiltersHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <Icon />
        <div>Filtrowanie</div>
      </Header>
      <Reset
        onClick={() => {
          dispatch(resetAllStates());
          onResetFilters(navigate);
        }}
      >
        Reset
      </Reset>
    </Wrapper>
  );
};

export default FiltersHeader;

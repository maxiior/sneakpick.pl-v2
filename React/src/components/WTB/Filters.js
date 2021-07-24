import { VscSearch } from "react-icons/vsc";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  color: #777;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
  width: 250px;
  height: 40px;
  border-right: 1px solid #f0f0f0;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
`;

const Reset = styled.button`
  padding: 3px 6px;
  background-color: #00b4ff;
  border-radius: 5px;
  border: none;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline: none;
`;

const Icon = styled(VscSearch)`
  margin-right: 5px;
  margin-top: 3px;
`;

const Filters = () => {
  return (
    <Wrapper>
      <Header>
        <Icon />
        <div>Filtrowanie</div>
      </Header>
      <Reset>Reset</Reset>
    </Wrapper>
  );
};

export default Filters;

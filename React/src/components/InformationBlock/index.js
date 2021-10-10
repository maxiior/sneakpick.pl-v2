import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetInformationBlock } from "store/interface/actions";
import { informations } from "constants/informations";

const Wrapper = styled.div`
  @keyframes go_down {
    0% {
      top: 0px;
      opacity: 0;
    }
    100% {
      top: 70px;
      opacity: 1;
    }
  }

  animation-name: go_down;
  animation-duration: 0.5s;
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 70px;
  z-index: 1050;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  padding: 20px 100px;
  position: relative;
  max-width: 600px;
`;

const Close = styled(IoMdClose)`
  right: 10px;
  top: 10px;
  cursor: pointer;
  position: absolute;
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Header = styled.div``;

const Content = styled.div`
  font-size: 12px;
  margin-top: 3px;
`;

const InformationBlock = ({ type }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container>
        <Header>{informations[type].header}</Header>
        <Content>{informations[type].content}</Content>
        <Close onClick={() => dispatch(resetInformationBlock())} />
      </Container>
    </Wrapper>
  );
};

export default InformationBlock;

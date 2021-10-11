import styled from "styled-components";
import ChatRoom from "components/Communicator/ChatRoom";
import { IoMdClose } from "react-icons/io";
import {
  hideCommunicator,
  displayCommunicatorIcon,
} from "store/interface/actions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  @keyframes displayCommunicator {
    0% {
      transform: translateX(350px);
    }
    100% {
      transform: translateX(0);
    }
  }

  animation-name: displayCommunicator;
  animation-duration: 0.3s;
  height: 100%;
  width: 350px;
  background-color: #0d0d0d;
  position: fixed;
  right: 0;
  z-index: 999;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const Close = styled(IoMdClose)`
  cursor: pointer;
  color: ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const TopBar = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.white};
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Number = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.red};
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div``;

const Communicator = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <TopBar>
        <Header>
          Direct Messages<Number>2</Number>
        </Header>
        <Close
          onClick={() => {
            dispatch(hideCommunicator());
            dispatch(displayCommunicatorIcon());
          }}
        />
      </TopBar>
      <Container>
        <ChatRoom
          name="Michał Karmowski"
          lastMessage="siema co się z tb dzieje ostatnio?"
        />
        <ChatRoom
          name="Jacek Murański"
          lastMessage="ile za tą skórzaną kurtkę?"
        />
      </Container>
    </Wrapper>
  );
};

export default Communicator;

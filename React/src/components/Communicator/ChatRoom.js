import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 25px;
  user-select: none;
  cursor: pointer;
  align-items: center;

  :hover {
    background-color: ${({ theme }) => theme.veryDarkGrey};
  }
`;

const Avatar = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grey};
`;

const Container = styled.div`
  padding: 10px;
  width: 240px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
`;

const LastMessage = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  margin-top: 3px;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.blue};
  font-size: 14px;
  padding-left: 10px;
`;

const ChatRoom = ({ name, lastMessage }) => {
  return (
    <Wrapper>
      <Avatar />
      <Container>
        <Name>
          {name}
          <Time> 2 godz.</Time>
        </Name>
        <LastMessage>{lastMessage}</LastMessage>
      </Container>
    </Wrapper>
  );
};

export default ChatRoom;

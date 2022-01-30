import styled from "styled-components";
import buy from "assets/other.png";
import { iNotification } from "types/Nav/LoggedPanel/NotificationsPanel/notification";

const Wrapper = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grey};
  :last-child {
    border: 0;
  }
`;

const Image = styled.div`
  height: 72px;
  width: 72px;
  cursor: pointer;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
`;

const Informations = styled.div`
  padding-right: 15px;
  white-space: normal;
`;

const Name = styled.div``;

const Parameter = styled.div<{ time?: boolean }>`
  color: ${({ theme, time }) => (time ? theme.blue : theme.darkGrey)};
  font-size: 12px;
`;

const Container = styled.div`
  padding-left: 15px;
  display: flex;
  width: 350px;
  cursor: pointer;
  justify-content: space-between;
`;

const Unread = styled.div`
  position: absolute;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.red};
  cursor: pointer;
  top: 0;
  left: 0;
`;

const Notification = ({ data }: { data: iNotification }) => {
  return (
    <Wrapper>
      <Image
        style={{
          backgroundImage: `url(${buy})`,
        }}
      >
        {!data.displayed && <Unread />}
      </Image>
      <Container>
        <Informations>
          <Name>
            {data.first_name} {data.last_name} {data.type}.
          </Name>
          <Parameter>
            {data.item_name}, rozmiar {data.size}, {data.price}PLN
          </Parameter>
          <Parameter time>52 min temu</Parameter>
        </Informations>
      </Container>
    </Wrapper>
  );
};

export default Notification;

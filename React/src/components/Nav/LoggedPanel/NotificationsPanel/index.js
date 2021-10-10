import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  top: 60px;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: 500px;
  display: none;
  padding: 20px;
`;

const FollowedItemsList = styled.div`
  max-height: 206px;
  overflow-y: auto;
  padding-right: 20px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.grey};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.blue};
  }
`;

const NotificationsPanel = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Header>Powiadomienia</Header>
      <FollowedItemsList>
        {/* {items.map((e, i) => (
          <FollowedItem
            key={i}
            name={e.name}
            size={e.size}
            condition={e.condition}
            price={e.price}
            id={e.id}
          />
        ))} */}
      </FollowedItemsList>
    </Wrapper>
  );
};

export default NotificationsPanel;

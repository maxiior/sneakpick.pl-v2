import styled from "styled-components";
import FollowedItem from "./FollowedItem";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useAppSelector } from "hooks/useAppSelector";

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

const Header = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

const List = styled.div`
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

const Empty = styled.div`
  width: 422px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-radius: ${({ theme }) => theme._10px};
  cursor: pointer;
  margin-top: 15px;
  display: block;
  text-decoration: none;

  :hover {
    opacity: 0.9;
  }
`;

const FollowedPanel = ({ className }: { className?: any }) => {
  const { items, results } = useAppSelector((state) => state.followedSlice);

  return (
    <Wrapper className={className}>
      <Header>MOJE OBSERWOWANE</Header>
      {results > 0 ? (
        <List>
          {items.map((e, i) => (
            <FollowedItem key={i} data={e} />
          ))}
        </List>
      ) : (
        <Empty>
          Aktualnie nie posiadasz żadnych zaobserwowanych przedmiotów.
        </Empty>
      )}
      <Button to={routes.FOLLOWED}>OBSERWOWANE</Button>
    </Wrapper>
  );
};

export default FollowedPanel;

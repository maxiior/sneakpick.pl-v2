import styled from "styled-components";
import FollowedItem from "./FollowedItem";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Header = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  display: block;
  text-decoration: none;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  top: 60px;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: none;
  padding: 20px;
`;

const FollowedPanel = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Header>MOJE OBSERWOWANE</Header>
      <FollowedItem
        name="Adidas Yeezy Boost 350 V2 Zyone"
        size="44.0"
        condition="DS"
        price="1300.00"
      />
      <FollowedItem
        name="Nike Vapor Max"
        size="44.0"
        condition="DS"
        price="309.00"
      />
      <Button to={routes.FOLLOWED}>OBSERWOWANE</Button>
    </Wrapper>
  );
};

export default FollowedPanel;

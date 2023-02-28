import styled from "styled-components";
import image from "assets/talk.png";
import Navigation from "./Navigation";

const Wrapper = styled.div``;

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${image});
  height: 350px;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.white};
  font-size: 70px;
  user-select: none;
  font-weight: 500;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 60px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 8vw;
  }
`;

const Header = styled.div`
  text-align: center;
`;

const TopPanel = () => {
  return (
    <Wrapper>
      <Container>
        <Header>TALK</Header>
      </Container>
      <Navigation />
    </Wrapper>
  );
};

export default TopPanel;

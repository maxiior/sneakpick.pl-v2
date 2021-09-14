import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";

const Wrapper = styled.div``;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
  margin-bottom: 5px;
`;

const Container = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  :last-child {
    margin: 0;
  }
`;

const LocationIcon = styled(IoLocationOutline)`
  font-size: 22px;
  color: ${({ theme }) => theme.darkGrey};
  width: 30px;
`;

const ClockIcon = styled(AiOutlineClockCircle)`
  font-size: 20px;
  color: ${({ theme }) => theme.darkGrey};
  width: 30px;
`;

const Value = styled.div`
  font-size: 15px;
  margin-left: 5px;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const Informations = ({ city }) => {
  return (
    <Wrapper>
      <Header>O mnie:</Header>
      <Container>
        <LocationIcon />
        <Value>{city}</Value>
      </Container>
      <Container>
        <ClockIcon />
        <Value>Aktywny(a) 2 godz. temu</Value>
      </Container>
      <Description>
        tutaj może być opis / tutaj może być opis / tutaj może być opis / tutaj
        może być opis / tutaj może być opis / tutaj może być opis / tutaj może
        być opis / tutaj może być opis / tutaj może być opis / tutaj może być
        opis
      </Description>
    </Wrapper>
  );
};

export default Informations;

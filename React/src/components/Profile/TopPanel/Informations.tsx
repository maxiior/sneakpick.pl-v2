import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";

const Wrapper = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: flex;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: block;
  justify-content: center;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
  margin-bottom: 10px;
`;

const Holder = styled.div`
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

const Value = styled.div`
  font-size: 15px;
  margin-left: 5px;
`;

const ClockIcon = styled(AiOutlineClockCircle)`
  font-size: 20px;
  color: ${({ theme }) => theme.darkGrey};
  width: 30px;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const Informations = ({
  city,
  description,
}: {
  city: string;
  description: string;
}) => {
  return (
    <Wrapper>
      <Container>
        <Header>O mnie:</Header>
        <Holder>
          <LocationIcon />
          <Value>{city}</Value>
        </Holder>
        <Holder>
          <ClockIcon />
          <Value>Aktywny(a) 2 godz. temu</Value>
        </Holder>
        <Description>{description}</Description>
      </Container>
    </Wrapper>
  );
};

export default Informations;

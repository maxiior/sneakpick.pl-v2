import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axiosInstance from "axios/axios";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
`;

const Avatar = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grey};
`;

const TopPanel = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
`;

const Name = styled.div`
  font-size: 30px;
`;

const RightPart = styled.div`
  padding: 20px 40px;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  border-radius: 10px;

  :hover {
    opacity: 0.9;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 12px;
  margin-bottom: 5px;
`;

const BottomPanel = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.grey};
`;

const Informations = styled.div``;

const LocationIcon = styled(IoLocationOutline)`
  font-size: 22px;
  color: ${({ theme }) => theme.darkGrey};
`;

const ClockIcon = styled(AiOutlineClockCircle)`
  font-size: 20px;
  color: ${({ theme }) => theme.darkGrey};
`;

const InformationHolder = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  :last-child {
    margin: 0;
  }
`;

const InformationValue = styled.div`
  font-size: 15px;
  margin-left: 5px;
`;

const ButtonsHolder = styled.div`
  display: flex;
`;

const Label = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 10px 30px;
  font-size: 20px;
  width: 250px;
  text-align: center;
  margin-top: -1px;
  margin-bottom: 30px;
`;

const Profile = () => {
  const { user } = useParams();
  const [data, setData] = useState({ user: {} });

  useEffect(() => {
    axiosInstance.get(user).then((response) => {
      setData({ user: response.data });
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel>
          <Avatar />
          <RightPart>
            <Name>Maksim Brzezinski</Name>
            <ButtonsHolder>
              <Button>DM</Button>
              <Button>Follow</Button>
              <Button>Callout</Button>
              <Button>Legit</Button>
            </ButtonsHolder>
            <Informations>
              <Header>O mnie:</Header>
              <InformationHolder>
                <LocationIcon />
                <InformationValue>Warszawa</InformationValue>
              </InformationHolder>
              <InformationHolder>
                <ClockIcon />
                <InformationValue>Aktywny(a) 2 godz. temu</InformationValue>
              </InformationHolder>
            </Informations>
          </RightPart>
        </TopPanel>
        <BottomPanel>
          <Label>Moje itemy</Label>
        </BottomPanel>
      </Container>
    </Wrapper>
  );
};

export default Profile;

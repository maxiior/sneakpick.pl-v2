import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import Items from "components/Profile/Items";
import { fetchItems as fetchItemsAction } from "actions/profile";
import { fetchUser as fetchUserAction } from "actions/profile";
import { connect } from "react-redux";
import axiosInstance from "axios/axios";
import { endpoints } from "routes";

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
  padding: 5px 30px;
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
  width: 30px;
`;

const ClockIcon = styled(AiOutlineClockCircle)`
  font-size: 20px;
  color: ${({ theme }) => theme.darkGrey};
  width: 30px;
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

const NumberOfItems = styled.div`
  font-size: 20px;
`;

const Label = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 10px 30px;
  font-size: 20px;
  width: 250px;
  text-align: center;
  margin-top: -1px;
  margin-bottom: 20px;
`;

const TopHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Profile = ({ fetchItems, fetchUser, userData, results }) => {
  const { user } = useParams();

  useEffect(() => {
    fetchUser(user);
    fetchItems(user);
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel>
          <Avatar />
          <RightPart>
            <TopHolder>
              <Name>
                {userData.first_name} {userData.last_name}
              </Name>
              <ButtonsHolder>
                <Button>DM</Button>
                <Button>Follow</Button>
                <Button>Callout</Button>
                <Button>Legit</Button>
              </ButtonsHolder>
            </TopHolder>
            <Informations>
              <Header>O mnie:</Header>
              <InformationHolder>
                <LocationIcon />
                <InformationValue>{userData.city}</InformationValue>
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
          <NumberOfItems>
            {results} {results === 1 ? "przedmiot" : "przedmiotów"}
          </NumberOfItems>
          <Items />
        </BottomPanel>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ profileReducer }) => {
  return {
    userData: profileReducer.user,
    results: profileReducer.results,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (user) => dispatch(fetchItemsAction(user)),
  fetchUser: (user) => dispatch(fetchUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

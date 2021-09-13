import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Informations from "components/Profile/Informations";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { fetchUser as fetchUserAction } from "actions/profile";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
`;

const LeftContainer = styled.div`
  width: 20%;
`;

const RightContainer = styled.div`
  padding: 20px 40px;
  width: 80%;
`;

const Avatar = styled.div`
  width: 80%;
  padding-bottom: 80%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grey};
`;

const Name = styled.div`
  font-size: 30px;
`;

const ShieldIcon = styled(IoShieldCheckmarkOutline)`
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
  margin-left: 10px;
`;

const TopHolder = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
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
  margin-right: 10px;
  width: 185px;

  :hover {
    opacity: 0.9;
  }
  :last-child {
    margin: 0;
  }

  ${({ edit }) =>
    edit &&
    css`
      background-color: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.darkGrey};
      border: 1px solid ${({ theme }) => theme.darkGrey}; ;
    `}
`;

const ButtonsHolder = styled.div`
  display: flex;
`;

const MiddleHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 16px;
`;

const FollowStatistic = styled.div`
  display: flex;
  user-select: none;
  cursor: pointer;

  :last-child {
    margin-left: 20px;
  }
`;

const Value = styled.div`
  font-weight: 500;
`;

const Measure = styled.div`
  margin-left: 5px;
`;

const TopPanel = ({ fetchUser, userData }) => {
  const { user } = useParams();

  useEffect(() => {
    fetchUser(user);
  }, []);

  return (
    <Wrapper>
      <LeftContainer>
        <Avatar />
      </LeftContainer>
      <RightContainer>
        <TopHolder>
          <Name>
            {userData.first_name} {userData.last_name}
            <ShieldIcon />
          </Name>
          <ButtonsHolder>
            <Button>DM</Button>
            <Button>Follow</Button>
            <Button edit>Edytuj profil</Button>
            {/* <Button>Callout</Button>
                <Button>Legit</Button> */}
          </ButtonsHolder>
        </TopHolder>
        <MiddleHolder>
          <FollowStatistic>
            <Value>10</Value>
            <Measure>obserwujących</Measure>
          </FollowStatistic>
          <FollowStatistic>
            <Value>15</Value>
            <Measure>obserwowanych</Measure>
          </FollowStatistic>
        </MiddleHolder>
        <Informations city={userData.city} />
      </RightContainer>
    </Wrapper>
  );
};

const mapStateToProps = ({ profileReducer }) => {
  return {
    userData: profileReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (user) => dispatch(fetchUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);

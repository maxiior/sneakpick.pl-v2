import { useEffect } from "react";
import styled, { css } from "styled-components";
import Informations from "components/Profile/Informations";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { fetchUser } from "store/profile/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useDispatch, useSelector } from "react-redux";

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

  ${({ editable }) =>
    editable &&
    css`
      cursor: pointer;
    `}
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

const Edit = styled(Link)`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.darkGrey};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  padding: 5px 30px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  width: 185px;
  text-decoration: none;

  :hover {
    opacity: 0.9;
  }
`;

const TopPanel = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileSlice);
  const { user_id } = useSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(fetchUser(user));
  });

  const isAuthenticated = useSelector(
    (state) => state.authSlice.isAuthenticated
  );

  return (
    <Wrapper>
      <LeftContainer>
        <Avatar editable={profile.user.id === user_id} />
      </LeftContainer>
      <RightContainer>
        <TopHolder>
          <Name>
            {profile.user.first_name} {profile.user.last_name}
            <ShieldIcon />
          </Name>
          <ButtonsHolder>
            {isAuthenticated && profile.user.id !== user_id && (
              <>
                <Button>DM</Button>
                <Button>Follow</Button>
              </>
            )}
            {isAuthenticated && profile.user.id === user_id && (
              <Edit to={routes.PROFILE_SETTINGS}>Edytuj profil</Edit>
            )}
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
        <Informations city={profile.user.city} />
      </RightContainer>
    </Wrapper>
  );
};

export default TopPanel;

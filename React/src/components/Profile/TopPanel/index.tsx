import { useEffect } from "react";
import styled, { css } from "styled-components";
import Informations from "components/Profile/TopPanel/Informations";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { fetchUser } from "store/profile/actions";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { routes } from "routes";
import { getUserPhoto } from "functions/getUserPhoto";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import Avatar from "components/Profile/Avatar";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    display: block;
  }
`;

const LeftContainer = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const RightContainer = styled.div`
  padding: 20px 40px;
  width: 100%;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    padding: 20px 0px;
  }
`;

const Name = styled.div`
  font-size: 25px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 20px;
  }
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

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    display: block;
  }
`;

const Button = styled.div<{ followed?: boolean }>`
  background-color: ${({ theme, followed }) =>
    followed ? theme.grey : theme.blue};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme._5px};
  margin-right: 10px;
  width: 150px;
  align-items: center;

  :hover {
    opacity: 0.9;
  }
  :last-child {
    margin: 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    width: 100%;
    margin-right: 0px;
  }
`;

const ButtonsHolder = styled.div<{ $other: boolean }>`
  display: flex;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    justify-content: center;

    ${({ $other }) =>
      $other &&
      css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px;
      `}
  }
`;

const MiddleHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 16px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    justify-content: center;
  }
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
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  padding: 10px 30px;
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme._5px};
  width: 150px;
  text-decoration: none;
  align-items: center;

  :hover {
    opacity: 0.9;
  }
`;

const Adnotation = styled(Link)`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const TopPanel = () => {
  const { user }: { user: string } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const profile = useAppSelector((state) => state.profileSlice);
  const { user_id, isAuthenticated } = useAppSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    dispatch(fetchUser(user))
      .then(() => {})
      .catch(() => {});
  }, [user, dispatch]);

  return (
    <Wrapper>
      <LeftContainer>
        <div>
          <Avatar
            editable={user === user_id}
            rating={profile.user.rating}
            photo={
              profile.user.photo !== ""
                ? getUserPhoto(profile.user.photo)
                : defaultUserPicture
            }
          />
          {location.pathname.indexOf("comments") === -1 &&
            user !== user_id &&
            isAuthenticated && (
              <Adnotation
                to={{
                  pathname: routes.USER_PROFILE_COMMENTS.replace(":user", user),
                  state: "open_rating_panel",
                }}
              >
                Oce?? u??ytkownika
              </Adnotation>
            )}
        </div>
      </LeftContainer>
      <RightContainer>
        <TopHolder>
          <Name>
            {profile.user.first_name} {profile.user.last_name}
            <ShieldIcon />
          </Name>
          <ButtonsHolder $other={user !== user_id}>
            {isAuthenticated && user !== user_id && (
              <>
                <Button>DM</Button>
                <Button>Follow</Button>
              </>
            )}
            {isAuthenticated && user === user_id && (
              <Edit to={routes.PROFILE_SETTINGS}>Edytuj profil</Edit>
            )}
            {/* <Button>Callout</Button>
                <Button>Legit</Button> */}
          </ButtonsHolder>
        </TopHolder>
        <MiddleHolder>
          <FollowStatistic>
            <Value>{profile.user.followers_count}</Value>
            <Measure>obserwuj??cych</Measure>
          </FollowStatistic>
          <FollowStatistic>
            <Value>{profile.user.following_count}</Value>
            <Measure>obserwowanych</Measure>
          </FollowStatistic>
        </MiddleHolder>
        <Informations
          description={profile.user.description}
          city={profile.user.city}
        />
      </RightContainer>
    </Wrapper>
  );
};

export default TopPanel;

import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useAppDispatch } from "hooks/useAppDispatch";
import { changeFollowedNumber } from "store/profile/actions";
import { useAppSelector } from "hooks/useAppSelector";
import { getUserPhoto } from "functions/getUserPhoto";
import { iUser } from "types/user";
import { iAuthentication } from "types/authentication";
import { followUser, unfollowUser } from "api/services/profile.service";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;

const Avatar = styled(Link)<{ photo?: string }>`
  height: 40px;
  width: 40px;
  background-color: ${({ theme }) => theme.grey};
  border-radius: 50%;
  cursor: pointer;
  background-image: url(${({ photo }) => photo});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  cursor: pointer;
`;

const Informations = styled(Link)`
  margin-left: 10px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 14px;
`;

const Button = styled.div<{ followed?: boolean }>`
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.blue};
  padding: 0px 20px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;

  :hover {
    opacity: 0.9;
  }

  ${({ followed }) =>
    followed &&
    css`
      color: ${({ theme }) => theme.grey};
      background-color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.grey};
    `};
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const Follower = ({
  data,
  auth,
  popup,
}: {
  data: iUser;
  auth: iAuthentication;
  popup: number;
}) => {
  const [followed, setFollowed] = useState(data.is_followed);
  const { id } = useAppSelector((state) => state.profileSlice.user);
  const dispatch = useAppDispatch();

  const follow = () => {
    followUser(data.id)
      .then((response) => {
        if (response.status === 201) {
          setFollowed(true);
          if (auth.user_id === id) dispatch(changeFollowedNumber(1));
        }
      })
      .catch(() => {});
  };

  const unfollow = () => {
    unfollowUser(data.id)
      .then((response) => {
        if (response.status === 200) {
          setFollowed(false);
          if (auth.user_id === id) dispatch(changeFollowedNumber(-1));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    setFollowed(data.is_followed);
  }, [data]);

  return (
    <Wrapper>
      <Holder>
        <Avatar
          to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.id)}
          photo={getUserPhoto(data.profile_photo)}
        />
        <Informations
          to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.id)}
        >
          {data.first_name} {data.last_name}
        </Informations>
      </Holder>
      {auth.isAuthenticated &&
        auth.user_id !== data.id &&
        (followed ? (
          <Button followed onClick={() => unfollow()}>
            Unfollow
          </Button>
        ) : (
          <Button onClick={() => follow()}>Follow</Button>
        ))}
    </Wrapper>
  );
};

export default Follower;

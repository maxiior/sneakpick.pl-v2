import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import { IPost } from "./types/post";
import { endpoints, routes } from "routes";
import { formatDate } from "functions/formatDate";
import { getPhoto } from "functions/getPhoto";
import TopPanel from "./TopPanel";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  display: flex;
  color: ${({ theme }) => theme.darkGrey};
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    display: block;
  }
`;

const Avatar = styled(Link)<{ photo: string }>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;

  background-image: url(${({ photo }) => (photo ? photo : defaultUserPicture)});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: block;
  }
`;

const Owner = styled(Link)`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  margin-left: 4px;
  text-decoration: none;
  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: flex;
    justify-content: center;
    margin-left: 0;
    margin-bottom: 5px;
  }
`;

const Prefix = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: flex;
    justify-content: center;
  }
`;

const Value = styled.div`
  margin-top: -3px;
  margin-left: 3px;
`;

const Holder = styled.div`
  display: flex;
  margin-bottom: -2px;
`;

const CommentIcon = styled(FaRegCommentAlt)`
  font-size: 12px;
`;

const InformationsHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  margin-right: 15px;
`;

const AvatarHolder = styled.div`
  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }
`;

const OwnerHolder = styled.div`
  display: flex;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    justify-content: center;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    display: block;
  }
`;

const Post = ({ data }: { data: IPost }) => {
  const [date, setDate] = useState<{ time: string; wait: number }>(
    formatDate(data.published)
  );

  const updateDate = () => {
    if (date.wait !== 0) {
      setTimeout(() => {
        setDate(formatDate(data.published));
        updateDate();
      }, date.wait);
    }
  };

  useEffect(() => {
    setDate(formatDate(data.published));
    updateDate();
  }, [data.published]);

  console.log(getPhoto(data.profile_photo, endpoints.USER_IMAGES));

  return (
    <Wrapper>
      <TopPanel data={data} />
      <Container>
        <OwnerHolder>
          <AvatarHolder>
            <Avatar
              photo={
                data.profile_photo &&
                getPhoto(data.profile_photo, endpoints.USER_IMAGES)
              }
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.owner)}
            />
          </AvatarHolder>
          <Information>
            <Prefix>Post dodany przez </Prefix>
            <Owner
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.owner)}
            >
              {data.first_name} {data.last_name}
            </Owner>
          </Information>
        </OwnerHolder>
        <InformationsHolder>
          <Date>{date.time}</Date>
          <Holder>
            <CommentIcon />
            <Value>50+</Value>
          </Holder>
        </InformationsHolder>
      </Container>
    </Wrapper>
  );
};

export default Post;

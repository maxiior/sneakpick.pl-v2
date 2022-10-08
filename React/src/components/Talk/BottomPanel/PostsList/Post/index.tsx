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

const Avatar = styled(Link)<{ photo: string }>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;

  background-image: url(${({ photo }) => (photo ? photo : defaultUserPicture)});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
`;

const Owner = styled(Link)`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  margin-left: 4px;
  text-decoration: none;
`;

const Holder = styled.div`
  display: flex;
  color: ${({ theme }) => theme.darkGrey};
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

const Value = styled.div`
  margin-top: -3px;
  margin-left: 3px;
`;

const CommentsInformationHolder = styled.div`
  display: flex;
`;

const CommentIcon = styled(FaRegCommentAlt)`
  font-size: 12px;
`;

const AvatarHolder = styled.div`
  display: flex;
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

  return (
    <Wrapper>
      <TopPanel data={data} />
      <Holder>
        <AvatarHolder>
          <Avatar
            photo={getPhoto(data.profile_photo, endpoints.USER_IMAGES)}
            to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.owner)}
          />
          <Information>
            Post dodany przez{" "}
            <Owner
              to={routes.USER_PROFILE_PRODUCTS.replace(":user", data.owner)}
            >
              {data.first_name} {data.last_name}
            </Owner>
          </Information>
        </AvatarHolder>
        <Information>{date.time}</Information>
        <CommentsInformationHolder>
          <CommentIcon />
          <Value>50+</Value>
        </CommentsInformationHolder>
      </Holder>
    </Wrapper>
  );
};

export default Post;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes, endpoints } from "routes";
import defaultUserPicture from "assets/svg/default_user_picture.svg";
import { FaRegCommentAlt } from "react-icons/fa";
import { getPhoto } from "functions/getPhoto";
import { formatDate } from "functions/formatDate";

const Avatar = styled(Link)<{ photo?: string }>`
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

const Wrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.darkGrey};
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  margin-top: 15px;
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

const BottomPanel = ({
  firstName,
  lastName,
  owner,
  published,
  profilePhoto,
}: {
  firstName: string;
  lastName: string;
  owner: string;
  published: string;
  profilePhoto: string;
}) => {
  const [date, setDate] = useState<{ time: string; wait: number }>(
    formatDate(published)
  );

  const updateDate = () => {
    if (date.wait !== 0) {
      setTimeout(() => {
        setDate(formatDate(published));
        updateDate();
      }, date.wait);
    }
  };

  useEffect(() => {
    setDate(formatDate(published));
    updateDate();
  }, [published]);

  return (
    <Wrapper>
      <AvatarHolder>
        <Avatar
          photo={getPhoto(profilePhoto, endpoints.USER_IMAGES)}
          to={routes.USER_PROFILE_PRODUCTS.replace(":user", owner)}
        />
        <Information>
          Post dodany przez{" "}
          <Owner to={routes.USER_PROFILE_PRODUCTS.replace(":user", owner)}>
            {firstName} {lastName}
          </Owner>
        </Information>
      </AvatarHolder>
      <Information>{date.time}</Information>
      <CommentsInformationHolder>
        <CommentIcon />
        <Value>50+</Value>
      </CommentsInformationHolder>
    </Wrapper>
  );
};

export default BottomPanel;

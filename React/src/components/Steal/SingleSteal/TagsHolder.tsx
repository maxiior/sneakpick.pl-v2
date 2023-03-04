import React from "react";
import styled from "styled-components";
import { AiOutlineExpand } from "react-icons/ai";
import { FaRocket } from "react-icons/fa";
import { firstWordsLetterUppercase } from "functions/firstWordsLetterUppercase";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  font-size: ${({ theme }) => theme.font_size_SM};
`;

const DescriptionIcon = styled(AiOutlineExpand)`
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
  margin-right: 5px;
`;

const RocketIcon = styled(FaRocket)`
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
  margin-right: 5px;
`;

const IconsHolder = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div<{ alert?: boolean }>`
  padding: 5px;
  background-color: ${({ theme, alert }) => (alert ? theme.red : theme.blue)};
  color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radious_SM};
  margin-right: 5px;

  @keyframes alert {
    0% {
      transform: skew(20deg, 0deg);
    }
    5% {
      transform: skew(-20deg, 0deg);
    }
    10% {
      transform: skew(20deg, 0deg);
    }
    10% {
      transform: skew(0deg, 0deg);
    }
    100% {
      transform: skew(0deg, 0deg);
    }
  }

  animation: ${({ alert }) => alert && "alert 2.5s linear infinite alternate"};
`;

const TagsHolder = ({
  alert,
  category,
  markdown,
  rocket,
  description,
}: {
  alert?: boolean;
  category: string;
  markdown?: string;
  rocket?: boolean;
  description?: boolean;
}) => {
  return (
    <Wrapper>
      {alert && <Tag alert>Alert</Tag>}
      <Tag>
        {category === "ea" ? "EA" : firstWordsLetterUppercase(category)}
      </Tag>
      {markdown && <Tag>{markdown}</Tag>}
      <IconsHolder>
        {description && <DescriptionIcon />}
        {rocket && <RocketIcon />}
      </IconsHolder>
    </Wrapper>
  );
};

export default TagsHolder;

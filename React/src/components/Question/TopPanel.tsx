import React from "react";
import styled from "styled-components";
import Photo from "components/Question/Photo";
import { colorwaysTheme } from "theme/ColorwaysTheme";
import BottomPanel from "components/Question/BottomPanel";

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    width: 100%;
  }
`;

const Header = styled.header`
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 24px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_LG}) {
    font-size: 1.5em;
  }
`;

const Tag = styled.span<{ category: string }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ category }) =>
    category === "lc"
      ? colorwaysTheme.red
      : category === "id"
      ? colorwaysTheme.orange
      : category === "pc"
      ? colorwaysTheme.green
      : category === "fit"
      ? colorwaysTheme.blue
      : colorwaysTheme.purple};
  padding: 3px 7px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 5px;
`;

const Button = styled.span<{ active: boolean }>`
  background-color: ${({ theme, active }) =>
    active ? theme.grey : theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font_size_MD};
  border-radius: ${({ theme }) => theme.radious_SM};
  cursor: pointer;
  user-select: none;
  margin-left: 15px;

  :hover {
    filter: ${({ active }) => !active && "opacity(90%)"};
  }
`;

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const TopPanel = ({ data }: { data: any }) => {
  return (
    <Wrapper>
      <Header>
        <Holder>
          <div>{data.title}</div>
          <Tag category={data.category}>{data.category.toUpperCase()}</Tag>
        </Holder>
        <Button active={data.is_bumped}>Bump</Button>
      </Header>
      <Photo />
      <BottomPanel
        firstName={data.first_name}
        lastName={data.last_name}
        owner={data.owner}
        published={data.published}
        profilePhoto={data.profile_photo}
      />
    </Wrapper>
  );
};

export default TopPanel;

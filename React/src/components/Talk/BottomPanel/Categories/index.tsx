import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { ImPriceTag } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FaBlackTie } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { colorwaysTheme } from "theme/ColorwaysTheme";

const Wrapper = styled.div`
  padding: 20px;
  width: 20%;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
`;

const Categories = () => {
  return (
    <Wrapper>
      <Header>Kategorie</Header>
      <Option
        name="Identity Check"
        icon={<FaBlackTie />}
        color={colorwaysTheme.orange}
      />
      <Option
        name="Legit Check"
        icon={<FaCheck />}
        color={colorwaysTheme.red}
      />
      <Option
        name="Price Check"
        icon={<ImPriceTag />}
        color={colorwaysTheme.green}
      />
      <Option
        name="Fit Check"
        icon={<CgArrowsExpandLeft />}
        color={colorwaysTheme.blue}
      />
      <Option
        name="Inne"
        icon={<RiBarChartHorizontalLine />}
        color={colorwaysTheme.purple}
      />
    </Wrapper>
  );
};

export default Categories;

import React from "react";
import styled from "styled-components";
import Option from "./Option";
import { ImPriceTag } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FaBlackTie } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { colorwaysTheme } from "theme/ColorwaysTheme";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  width: 70%;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Error = styled.div`
  background-color: ${({ theme }) => theme.red};
  padding: 5px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;

const Container = styled.div``;

const Categories = ({ setCategory }: { setCategory: Function }) => {
  const { formState, setValue } = useFormContext();

  return (
    <Wrapper>
      <Header>Kategoria</Header>
      <Container>
        <Option
          name="Identity Check"
          tag="id"
          icon={<FaBlackTie />}
          color={colorwaysTheme.orange}
          setCategory={setCategory}
          setValue={setValue}
        />
        <Option
          name="Legit Check"
          tag="lc"
          icon={<FaCheck />}
          color={colorwaysTheme.red}
          setCategory={setCategory}
          setValue={setValue}
        />
        <Option
          name="Price Check"
          tag="pc"
          icon={<ImPriceTag />}
          color={colorwaysTheme.green}
          setCategory={setCategory}
          setValue={setValue}
        />
        <Option
          name="Fit Check"
          tag="fit"
          icon={<CgArrowsExpandLeft />}
          color={colorwaysTheme.blue}
          setCategory={setCategory}
          setValue={setValue}
        />
        <Option
          name="Inne"
          tag="other"
          icon={<RiBarChartHorizontalLine />}
          color={colorwaysTheme.purple}
          setCategory={setCategory}
          setValue={setValue}
        />
      </Container>
      {formState.errors["category"] && (
        <Error>{formState.errors["category"].message}</Error>
      )}
    </Wrapper>
  );
};

export default Categories;

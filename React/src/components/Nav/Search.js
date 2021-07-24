import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const StyledSearch = styled.input`
  outline: none;
  border-radius: 10px;
  border: none;
  padding: 5px 10px 5px 35px;
  width: 100%;
  height: 35px;

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
`;

const Icon = styled(AiOutlineSearch)`
  position: absolute;
  left: 8px;
  font-size: 20px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Search = () => {
  return (
    <Wrapper>
      <StyledSearch type="search" placeholder="Szukaj przedmiotów" />
      <Icon />
    </Wrapper>
  );
};

export default Search;

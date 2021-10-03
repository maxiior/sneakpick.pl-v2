import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";
import { useSelector } from "react-redux";

const StyledPath = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
  display: inline-block;
  margin-left: 15px;

  ol {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  ol > li {
    display: inline-block;
  }

  ol > li:first-child::before {
    content: "";
  }

  ol > li::before {
    padding: 0 5px;
    content: "/";
  }

  ol > li:last-child > a {
    color: ${({ theme }) => theme.blue};
    font-weight: 600;
  }
`;

const Step = styled(Link)`
  color: ${({ theme }) => theme.darkGrey};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Path = ({ className }) => {
  const { currentFilters } = useSelector((state) => state.filtersSlice);

  return (
    <StyledPath className={className}>
      <ol>
        <li>
          <Step to={routes.WTB}>All</Step>
        </li>
        {currentFilters.categories !== "" && (
          <li>
            <Step to={null}>{currentFilters.categories}</Step>
          </li>
        )}
        {currentFilters.brands.length === 1 ? (
          <li>
            <Step to={null}>{currentFilters.brands[0]}</Step>
          </li>
        ) : (
          currentFilters.brands.length > 1 && (
            <li>
              <Step to={null}>Some brands</Step>
            </li>
          )
        )}
      </ol>
    </StyledPath>
  );
};

export default Path;

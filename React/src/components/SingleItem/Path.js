import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";

const StyledPath = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
  display: inline-block;

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
    padding: 0;
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

const Path = ({ category, brand, className }) => {
  return (
    <StyledPath className={className}>
      <ol>
        <li>
          <Step to={routes.WTB}>All</Step>
        </li>
        <li>
          <Step
            to={
              routes.WTB +
              "?" +
              routes.CATEGORY +
              category +
              "&" +
              routes.DEFAULT_SEARCH
            }
          >
            {category}
          </Step>
        </li>
        <li>
          <Step
            to={
              routes.WTB +
              "?" +
              routes.BRAND +
              brand +
              "&" +
              routes.DEFAULT_SEARCH
            }
          >
            {brand}
          </Step>
        </li>
      </ol>
    </StyledPath>
  );
};

export default Path;

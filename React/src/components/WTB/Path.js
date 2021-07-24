import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPath = styled.div`
  color: #777;
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
    color: #00b4ff;
    font-weight: 600;
  }
`;

const Step = styled(Link)`
  color: #777;
  text-decoration: none;

  :hover {
    color: #00b4ff;
  }
`;

const Path = ({ steps }) => {
  return (
    <StyledPath>
      <ol>
        <li>
          <Step to="/all">All</Step>
        </li>
        {steps.map((step) => (
          <li>
            <Step to={step.path}>{step.name}</Step>
          </li>
        ))}
      </ol>
    </StyledPath>
  );
};

export default Path;

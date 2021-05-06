import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "theme/GlobalStyle";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import styled from "styled-components";

const Main = styled.div`
  padding-top: 60px;
`;

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyle />
    <Nav />
    <Main>{children}</Main>
    <Footer />
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;

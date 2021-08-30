import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "theme/GlobalStyle";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";

const Main = styled.div`
  padding-top: 60px;
  min-height: 100vh;

  @media only screen and (max-width: 1200px) {
    padding-top: 110px;
  }
`;

const MainTemplate = ({ children, mobileFilters }) => {
  const [loginView, setLoginView] = useState(false);
  const [registerView, setRegisterView] = useState(false);

  return (
    <>
      <GlobalStyle scroll={loginView || registerView || mobileFilters} />
      {loginView && <Login setLoginView={setLoginView} />}
      {registerView && <Register setRegisterView={setRegisterView} />}
      <Nav setLoginView={setLoginView} setRegisterView={setRegisterView} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

const mapStateToProps = ({ filtersReducer }) => {
  return {
    mobileFilters: filtersReducer.mobileFilters,
  };
};

export default connect(mapStateToProps)(MainTemplate);

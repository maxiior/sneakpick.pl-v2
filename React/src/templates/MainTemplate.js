import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "theme/GlobalStyle";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import Menu from "components/Menu/Menu";
import styled from "styled-components";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const Main = styled.div`
  padding-top: 60px;
  min-height: 100vh;

  @media only screen and (max-width: 1200px) {
    padding-top: 110px;
  }
`;

const MainTemplate = ({ children, mobileFilters }) => {
  const { menuView, registerView, loginView } = useSelector(
    (state) => state.interfaceSlice
  );

  return (
    <>
      <GlobalStyle
        scroll={loginView || registerView || mobileFilters || menuView}
      />
      {menuView && <Menu />}
      {loginView && <Login />}
      {registerView && <Register />}
      <Nav />
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

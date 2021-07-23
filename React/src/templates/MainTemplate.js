import React from "react";
import PropTypes from "prop-types";
import GlobalStyle from "theme/GlobalStyle";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import styled from "styled-components";
import { useState } from "react";

const Main = styled.div`
  padding-top: 60px;
`;

const MainTemplate = ({ children }) => {
  const [loginView, setLoginView] = useState(false);
  const [registerView, setRegisterView] = useState(false);

  return (
    <>
      <GlobalStyle scroll={loginView || registerView} />
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

export default MainTemplate;

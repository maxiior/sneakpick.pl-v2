import GlobalStyle from "theme/GlobalStyle";
import Nav from "components/Nav";
import Footer from "components/Footer/Footer";
import Login from "components/Login";
import Register from "components/Register/Register";
import MobileMenu from "components/MobileMenu";
import styled from "styled-components";
import { useAppSelector } from "hooks/useAppSelector";
import InformationBlock from "components/InformationBlock";
import { useScrollToTop } from "hooks/useScrollToTop";
import Popup from "components/Profile/Popup";
import ConditionalPopup from "components/ConditionalPopup";
import { deleteQuestion } from "api/services/talk.service";
import { information_types } from "constants/informations";
import { removeQuestion } from "store/talk/actions";

const Main = styled.div`
  padding-top: 60px;
  min-height: 100vh;

  @media only screen and (max-width: 1200px) {
    padding-top: 110px;
  }
`;

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const {
    menuView,
    registerView,
    loginView,
    mobileFilters,
    informationBlock,
    profilePopup,
    conditionalPopup,
  } = useAppSelector((state) => state.interfaceSlice);

  useScrollToTop();

  return (
    <>
      <GlobalStyle
        scroll={loginView || registerView || mobileFilters || menuView}
      />
      {informationBlock !== null && (
        <InformationBlock type={informationBlock} />
      )}
      {menuView && <MobileMenu />}
      {loginView && <Login />}
      {registerView && <Register />}
      {profilePopup !== 0 && <Popup />}
      {conditionalPopup.open && (
        <ConditionalPopup
          header="Czy na pewno chcesz usunąć to pytanie?"
          onAgree={() => deleteQuestion(conditionalPopup.id)}
          afterAgree={() => removeQuestion(conditionalPopup.id)}
          informationAfterAgree={information_types.question_deleted}
        />
      )}
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default MainTemplate;

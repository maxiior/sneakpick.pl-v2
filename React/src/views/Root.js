import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTemplate from "templates/MainTemplate";
import { routes } from "routes";
import { theme } from "theme/mainTheme";
import { ThemeProvider } from "styled-components";
import WTB from "views/WTB";
import WTS from "views/WTS";
import SingleItem from "views/SingleItem";
import Followed from "views/Followed";
import Home from "views/Home";
import Profile from "views/Profile";
import PageNotFound from "views/PageNotFound";
import ProfileSettings from "views/ProfileSettings";
import AccountSettings from "views/AccountSettings";
import CommunicatorTemplate from "templates/CommunicatorTemplate";
import useRefreshToken from "hooks/useRefreshToken";
import useFollowedItems from "hooks/useFollowedItems";
import Support from "views/Support";
import Talk from "views/Talk";
import Proxy from "views/Proxy";
import WTT from "views/WTT";
import Steal from "views/Steal";
import FAQ from "views/FAQ";
import UserProducts from "views/UserProducts";
import BusinessContact from "views/BusinessContact";
import PasswordChange from "views/AccountSettings/PasswordChange";
import EmailChange from "views/AccountSettings/EmailChange";
import UserComments from "views/UserComments";
import AccountActivation from "views/AccountActivation";
import PasswordResetting from "views/PasswordResetting";
import NewPassword from "views/NewPassword";
import NewEmailSetter from "views/NewEmailSetter";
import NewEmailActivation from "views/NewEmailActivation";
import ShipmentSettings from "views/ShipmentSettings";
import Question from "views/Question";
import QuestionAdder from "views/QuestionAdder";
import ProxyAdder from "views/ProxyAdder";
import ItemEditor from "views/ItemEditor";
import StealAdder from "views/StealAdder";
import TopSellers from "views/TopSellers";
import Calendar from "views/Calendar";

const App = () => {
  useRefreshToken();
  useFollowedItems();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CommunicatorTemplate>
          <MainTemplate>
            <Routes>
              <Route exact path={routes.HOME} element={<Home />} />
              <Route exact path={routes.WTB} element={<WTB />} />
              <Route path={routes.WTS} element={<WTS />} />
              <Route exact path={routes.ITEM} element={<SingleItem />} />
              <Route path={routes.ITEM_EDIT} element={<ItemEditor />} />
              <Route exact path={routes.PROFILE} element={<Profile />} />
              <Route path={routes.FOLLOWED} element={<Followed />} />
              <Route path={routes.SUPPORT} element={<Support />} />
              <Route exact path={routes.PROXY} element={<Proxy />} />
              <Route path={routes.PROXY_ADDER} element={<ProxyAdder />} />
              <Route path={routes.STEAL_ADDER} element={<StealAdder />} />
              <Route path={routes.STEAL} element={<Steal />} />
              <Route path={routes.WTT} element={<WTT />} />
              <Route path={routes.TOP_SELLERS} element={<TopSellers />} />
              <Route path={routes.RELEASE_CALENDAR} element={<Calendar />} />
              <Route exact path={routes.TALK} element={<Talk />} />
              <Route path={routes.ADD_QUESTION} element={<QuestionAdder />} />
              <Route path={routes.QUESTION} element={<Question />} />
              <Route path={routes.FAQ} element={<FAQ />} />
              <Route
                path={routes.PASSWORD_RESETTING}
                element={<PasswordResetting />}
              />
              <Route path={routes.NEW_PASSWORD} element={<NewPassword />} />
              <Route
                path={routes.ACCOUNT_ACTIVATION}
                element={<AccountActivation />}
              />
              <Route
                path={routes.BUSINESSCONTACT}
                element={<BusinessContact />}
              />
              <Route
                exact
                path={routes.USER_PROFILE_COMMENTS}
                element={<UserComments />}
              />
              <Route
                exact
                path={routes.USER_PROFILE_PRODUCTS}
                element={<UserProducts />}
              />
              <Route
                path={routes.PROFILE_SETTINGS}
                element={<ProfileSettings />}
              />
              <Route
                exact
                path={routes.ACCOUNT_SETTINGS}
                element={<AccountSettings />}
              />
              <Route
                path={routes.PASSWORD_CHANGE}
                element={<PasswordChange />}
              />
              <Route path={routes.SHIPMENT} element={<ShipmentSettings />} />
              <Route path={routes.EMAIL_CHANGE} element={<EmailChange />} />
              <Route path={routes.NEW_EMAIL} element={<NewEmailSetter />} />
              <Route
                path={routes.EMAIL_ACTIVATION}
                element={<NewEmailActivation />}
              />
              <Route element={<PageNotFound />} />
            </Routes>
          </MainTemplate>
        </CommunicatorTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

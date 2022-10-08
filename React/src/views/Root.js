import { BrowserRouter, Route, Switch } from "react-router-dom";
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

const App = () => {
  useRefreshToken();
  useFollowedItems();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CommunicatorTemplate>
          <MainTemplate>
            <Switch>
              <Route exact path={routes.HOME} component={Home} />
              <Route exact path={routes.WTB} component={WTB} />
              <Route path={routes.WTS} component={WTS} />
              <Route exact path={routes.ITEM} component={SingleItem} />
              <Route path={routes.ITEM_EDIT} component={ItemEditor} />
              <Route exact path={routes.PROFILE} component={Profile} />
              <Route path={routes.FOLLOWED} component={Followed} />
              <Route path={routes.SUPPORT} component={Support} />
              <Route exact path={routes.PROXY} component={Proxy} />
              <Route path={routes.PROXY_ADDER} component={ProxyAdder} />
              <Route path={routes.STEAL} component={Steal} />
              <Route path={routes.WTT} component={WTT} />
              <Route exact path={routes.TALK} component={Talk} />
              <Route path={routes.ADD_QUESTION} component={QuestionAdder} />
              <Route path={routes.QUESTION} component={Question} />
              <Route path={routes.FAQ} component={FAQ} />
              <Route
                path={routes.PASSWORD_RESETTING}
                component={PasswordResetting}
              />
              <Route path={routes.NEW_PASSWORD} component={NewPassword} />
              <Route
                path={routes.ACCOUNT_ACTIVATION}
                component={AccountActivation}
              />
              <Route
                path={routes.BUSINESSCONTACT}
                component={BusinessContact}
              />
              <Route
                exact
                path={routes.USER_PROFILE_COMMENTS}
                component={UserComments}
              />
              <Route
                exact
                path={routes.USER_PROFILE_PRODUCTS}
                component={UserProducts}
              />
              <Route
                path={routes.PROFILE_SETTINGS}
                component={ProfileSettings}
              />
              <Route
                exact
                path={routes.ACCOUNT_SETTINGS}
                component={AccountSettings}
              />
              <Route path={routes.PASSWORD_CHANGE} component={PasswordChange} />
              <Route path={routes.SHIPMENT} component={ShipmentSettings} />
              <Route path={routes.EMAIL_CHANGE} component={EmailChange} />
              <Route path={routes.NEW_EMAIL} component={NewEmailSetter} />
              <Route
                path={routes.EMAIL_ACTIVATION}
                component={NewEmailActivation}
              />
              <Route component={PageNotFound} />
            </Switch>
          </MainTemplate>
        </CommunicatorTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

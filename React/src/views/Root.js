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
import { ScrollToTop } from "components/ScrollToTop/ScrollToTop";
import SettingsTemplate from "templates/SettingsTemplate";
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
import BusinessContact from "views/BusinessContact";

const App = () => {
  useRefreshToken();
  useFollowedItems();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <CommunicatorTemplate>
          <MainTemplate>
            <Switch>
              <Route exact path={routes.HOME} component={Home} />
              <Route exact path={routes.WTB} component={WTB} />
              <Route path={routes.WTS} component={WTS} />
              <Route path={routes.ITEM} component={SingleItem} />
              <Route exact path={routes.DEFAULT_PROFILE} component={Profile} />
              <Route exact path={routes.PROFILE} component={Profile} />
              <Route path={routes.FOLLOWED} component={Followed} />
              <Route path={routes.SUPPORT} component={Support} />
              <Route path={routes.PROXY} component={Proxy} />
              <Route path={routes.STEAL} component={Steal} />
              <Route path={routes.WTT} component={WTT} />
              <Route path={routes.TALK} component={Talk} />
              <Route path={routes.FAQ} component={FAQ} />
              <Route
                path={routes.BUSINESSCONTACT}
                component={BusinessContact}
              />
              <SettingsTemplate>
                <Route
                  path={routes.PROFILE_SETTINGS}
                  component={ProfileSettings}
                />
                <Route
                  path={routes.ACCOUNT_SETTINGS}
                  component={AccountSettings}
                />
              </SettingsTemplate>
            </Switch>
          </MainTemplate>
        </CommunicatorTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainTemplate from "templates/MainTemplate";
import { routes } from "routes";

import { theme } from "theme/mainTheme";
import { ThemeProvider } from "styled-components";
import WTB from "views/WTB";
import WTS from "views/WTS";
import SingleItem from "views/SingleItem";
import Home from "views/Home";
import Profile from "views/Profile";
import ProfileSettings from "views/ProfileSettings";
import { ScrollToTop } from "components/ScrollToTop/ScrollToTop";
import SettingsTemplate from "templates/SettingsTemplate";
import AccountSettings from "views/AccountSettings";
import CommunicatorTemplate from "templates/CommunicatorTemplate";
import useRefreshToken from "hooks/useRefreshToken";

const App = () => {
  useRefreshToken();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <MainTemplate>
          <CommunicatorTemplate>
            <Switch>
              <Route exact path={routes.HOME} component={Home} />
              <Route exact path={routes.WTB} component={WTB} />
              <Route path={routes.WTS} component={WTS} />
              <Route path={routes.ITEM} component={SingleItem} />
              <Route path={routes.PROFILE} component={Profile} />
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
          </CommunicatorTemplate>
        </MainTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainTemplate from "templates/MainTemplate";
import { routes } from "routes";
import { Provider } from "react-redux";
import store from "store";
import { theme } from "theme/mainTheme";
import { ThemeProvider } from "styled-components";
import WTB from "views/WTB";
import WTS from "views/WTS";
import SingleItem from "views/SingleItem";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainTemplate>
            <Switch>
              <Route exact path={routes.HOME} component={WTB} />
              <Route exact path={routes.WTB} component={WTB} />
              <Route path={routes.WTS} component={WTS} />
              <Route path={routes.ITEM} component={SingleItem} />
            </Switch>
          </MainTemplate>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

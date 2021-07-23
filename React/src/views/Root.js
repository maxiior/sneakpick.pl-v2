import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainTemplate from "templates/MainTemplate";
import WTB from "views/WTB";
import WTS from "views/WTS";
import { routes } from "routes";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.HOME} component={WTB} />
            <Route path={routes.WTB} component={WTB} />
            <Route path={routes.WTS} component={WTS} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

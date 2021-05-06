import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainTemplate from "templates/MainTemplate";
import WTB from "views/WTB";
import { routes } from "routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.WTB} component={WTB} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </div>
  );
}

export default App;

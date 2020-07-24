import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";
import SplashScreen from "../SplashScreen";
import WeatherScreen from "../WeatherScreen";
import NotFoundPage from "../NotFoundPage";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route path="/weatherapp" component={WeatherScreen} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;

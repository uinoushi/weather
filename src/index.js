import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./containers/App";
import configureStore from "./store/configureStore.js";
import * as serviceWorker from "./serviceWorker";
import { lightBlue } from "@material-ui/core/colors";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightBlue[600],
      main: lightBlue[900],
      dark: lightBlue[800],
      contrastText: "#fff",
    },
  },
  typography: {
    fontSize: 12,
  },
  zIndex: {
    arrow: 9,
  },
  layout: {
    maxWidth: 992,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

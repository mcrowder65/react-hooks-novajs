import React, { Component } from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import OneHoc from "./one-hoc";
import { SnackbarProvider } from "./snackbar";

const browserHistory = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <SnackbarProvider>
        <BrowserRouter history={browserHistory}>
          <Route path="/one-hoc" component={OneHoc} />
        </BrowserRouter>
      </SnackbarProvider>
    );
  }
}

export default App;

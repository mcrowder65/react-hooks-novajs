import React, { Component } from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import OneHoc from "./one-hoc";
import { SnackbarProvider } from "./snackbar";
import OneRenderProps from "./one-renderprops";

const browserHistory = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <SnackbarProvider>
        <BrowserRouter history={browserHistory}>
          <div>
            <Route exact path="/one-hoc" component={OneHoc} />
            <Route path="/one-renderprops" component={OneRenderProps} />
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    );
  }
}

export default App;

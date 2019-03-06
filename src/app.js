import React, { Component } from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import OneHoc from "./one-hoc";
import { SnackbarProvider } from "./snackbar";
import OneRenderProps from "./one-renderprops";
import LoadingProvider from "./loading";
import TwoHoc from "./two-hoc";
import TwoRenderProps from "./two-renderprops";
import TwoHooks from "./two-hooks";
const browserHistory = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <SnackbarProvider>
        <LoadingProvider>
          <BrowserRouter history={browserHistory}>
            <div>
              <Route exact path="/one-hoc" component={OneHoc} />
              <Route path="/one-renderprops" component={OneRenderProps} />
              <Route path="/two-hoc" component={TwoHoc} />
              <Route path="/two-renderprops" component={TwoRenderProps} />
              <Route path="/two-hooks" component={TwoHooks} />
            </div>
          </BrowserRouter>
        </LoadingProvider>
      </SnackbarProvider>
    );
  }
}

export default App;

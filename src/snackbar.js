import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarContext = React.createContext();

export class SnackbarProvider extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  handleClick = (message) => () => {
    console.log("handleClick");
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { messageInfo } = this.state;
    console.log("messageInfo ", messageInfo);
    return (
      <SnackbarContext.Provider value={{ addMessage: () => this.handleClick }}>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
        />
        {this.props.children}
      </SnackbarContext.Provider>
    );
  }
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const withSnackbar = (YourComponent) => {
  return class extends React.Component {
    render() {
      return (
        <SnackbarContext.Consumer>
          {(value) => {
            value.addMessage("hello");
            console.log(value);
            return (
              <YourComponent {...this.props} addMessage={value.addMessage} />
            );
          }}
        </SnackbarContext.Consumer>
      );
    }
  };
};

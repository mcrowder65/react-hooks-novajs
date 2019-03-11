import React from "react";
import { Button } from "@material-ui/core";
import { WithSnackbar } from "./snackbar";

function OneRenderProps() {
  return (
    <WithSnackbar>
      {(props) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.addMessage("it worked!");
            }}
          >
            Add Snackbar
          </Button>
        );
      }}
    </WithSnackbar>
  );
}

export default OneRenderProps;

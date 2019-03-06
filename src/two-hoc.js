import React from "react";
import PropTypes from "prop-types";
import compose from "lodash.compose";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { withGlobalLoader, withLocalLoader } from "./loading";
import { withSnackbar } from "./snackbar";

function TwoHoc(props) {
  const globalClick = () => {
    props.makeApiCall(async () => {
      await sleep(3000);
      props.addMessage("global complete");
    });
  };

  const localClick = () => {
    props.makeApiCall(async () => {
      await sleep(1000);
      props.addMessage("local complete");
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={globalClick}
        disabled={props.isLoading}
      >
        Global button
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={localClick}
        disabled={props.isLoading}
      >
        Local button
      </Button>
    </>
  );
}

TwoHoc.propTypes = {
  makeApiCall: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addMessage: PropTypes.func.isRequired,
};
const enhance = compose(
  withLocalLoader,
  withGlobalLoader,
  withSnackbar,
);

export default enhance(TwoHoc);

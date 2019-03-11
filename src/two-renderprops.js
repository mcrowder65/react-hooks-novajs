import React from "react";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { useGlobalLoader, useLocalLoaders } from "./loading";
import { useSnackbar } from "./snackbar";

function TwoHoc() {
  const { addMessage } = useSnackbar();
  const global = useGlobalLoader();
  const local = useLocalLoaders();

  const globalClick = () => {
    global.makeApiCall(async () => {
      await sleep(3000);
      addMessage("global finished");
    });
  };
  const localClick = () => {
    local.makeApiCall(async () => {
      await sleep(1000);
      addMessage("local finished");
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={globalClick}
        disabled={global.isLoading}
      >
        Global button
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={localClick}
        disabled={local.isLoading}
      >
        Local button
      </Button>
    </>
  );
}

export default TwoHoc;

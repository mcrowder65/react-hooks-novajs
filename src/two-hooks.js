import React from "react";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { useGlobalLoader, useLocalLoader } from "./loading";
import { useSnackbar } from "./snackbar";

function TwoHooks() {
  const { addMessage } = useSnackbar();
  const global = useGlobalLoader();
  const local = useLocalLoader();
  const globalClick = () => {
    global.makeApiCall(async () => {
      await sleep(3000);
      addMessage("Global done");
    });
  };
  const localClick = () => {
    local.makeApiCall(async () => {
      await sleep(1000);
      addMessage("local done");
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

export default TwoHooks;

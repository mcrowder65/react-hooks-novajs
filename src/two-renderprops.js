import React from "react";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { WithGlobalLoader, WithLocalLoader } from "./loading";
import { WithSnackbar } from "./snackbar";

function TwoHoc() {
  return (
    <WithSnackbar>
      {({ addMessage }) => {
        return (
          <WithGlobalLoader>
            {(global) => {
              const globalClick = () => {
                global.makeApiCall(async () => {
                  await sleep(3000);
                  addMessage("global");
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
                  <WithLocalLoader>
                    {(local) => {
                      const localClick = () => {
                        local.makeApiCall(async () => {
                          await sleep(1000);
                        });
                      };
                      return (
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={localClick}
                          disabled={local.isLoading}
                        >
                          Local button
                        </Button>
                      );
                    }}
                  </WithLocalLoader>
                </>
              );
            }}
          </WithGlobalLoader>
        );
      }}
    </WithSnackbar>
  );
}

export default TwoHoc;

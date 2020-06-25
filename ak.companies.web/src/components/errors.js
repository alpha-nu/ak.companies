import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { errorsSelector } from "../state/selectors";
import { useRecoilValue } from "recoil";
import { Alert, AlertTitle } from "@material-ui/lab";

export default () => {
  const errors = useRecoilValue(errorsSelector);

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    //clear errors through selector
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={errors !== null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {JSON.stringify(errors, null, 2)}
        </Alert>
      </Snackbar>
    </div>
  );
};

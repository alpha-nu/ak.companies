import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { errorsSelector } from "../state/selectors";
import { useRecoilState } from "recoil";
import { Alert, AlertTitle } from "@material-ui/lab";

export default () => {
  const [errors, reset] = useRecoilState(errorsSelector);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    reset();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={errors !== null}
        autoHideDuration={5000}
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
          {errors}
        </Alert>
      </Snackbar>
    </div>
  );
};

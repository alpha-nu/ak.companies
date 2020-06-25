import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { notificationSelector } from "../state/selectors";
import { useRecoilState } from "recoil";
import { Alert, AlertTitle } from "@material-ui/lab";

export default () => {
  const [notification, reset] = useRecoilState(notificationSelector);

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
        open={notification !== null}
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
          severity="success"
        >
          <AlertTitle>Notification</AlertTitle>
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
};

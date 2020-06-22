import React, { useState } from "react";
import { useAuth0 } from "../../auth/auth0-spa";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Fab,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleRounded";
import LogoutIcon from "@material-ui/icons/ExitToAppRounded";
import EmailIcon from "@material-ui/icons/EmailRounded";
import TokenIcon from "@material-ui/icons/VpnKeyRounded";
import LoginIcon from "@material-ui/icons/LockOpenRounded";
import DropDownIcon from "@material-ui/icons/ArrowDropDownRounded";
import CopyIcon from "@material-ui/icons/FileCopyRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";

export default () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => setAnchorEl(null);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [token, setToken] = useState();
  const { getTokenSilently } = useAuth0();

  const showToken = async () => {
    setTokenDialogOpen(true);
    const token = await getTokenSilently();
    setToken(token);
  };

  const hideToken = () => setTokenDialogOpen(false);

  const copyToken = async () => {
    const result = await navigator.permissions.query({
      name: "clipboard-write",
    });

    if (["granted", "prompt"].includes(result.state)) {
      await navigator.clipboard.writeText(token);
    }
  };

  if (!isAuthenticated) {
    return (
      <Button
        size="large"
        endIcon={<LoginIcon />}
        onClick={() => loginWithRedirect({})}
      >
        Log in
      </Button>
    );
  }

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        startIcon={<AccountIcon fontSize="large" />}
        endIcon={<DropDownIcon fontSize="large" />}
        edge="end"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Profile
      </Button>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem disabled={true}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>{user.email}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            showToken();
          }}
        >
          <ListItemIcon>
            <TokenIcon />
          </ListItemIcon>
          <ListItemText>Token</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={tokenDialogOpen} onClose={hideToken}>
        <DialogTitle>This is your Auth Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can use it to test the API directly
          </DialogContentText>
          <DialogContentText
            style={{ overflowWrap: "anywhere" }}
            variant="caption"
          >
            {token}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Copy to Clipboard">
            <Fab size="small" color="primary" onClick={copyToken}>
              <CopyIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Close">
            <Fab size="small" color="primary" onClick={hideToken}>
              <CloseIcon />
            </Fab>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
};

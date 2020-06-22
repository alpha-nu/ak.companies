import React, { useState } from "react";
import { useAuth0 } from "../../auth/auth0-spa";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleRounded";
import LogoutIcon from "@material-ui/icons/ExitToAppRounded";
import EmailIcon from "@material-ui/icons/EmailRounded";
import TokenIcon from "@material-ui/icons/VpnKeyRounded";
import LoginIcon from "@material-ui/icons/LockOpenRounded";
import DropDownIcon from "@material-ui/icons/ArrowDropDownRounded";

export default () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => setAnchorEl(null);

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
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem disabled={true}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>{user.email}</ListItemText>
        </MenuItem>
        <MenuItem>
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
    </div>
  );
};

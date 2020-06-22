import React, { useState } from "react";
import { useAuth0 } from "../../auth/auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircleRounded";
import LogoutIcon from "@material-ui/icons/ExitToAppRounded";
import EmailIcon from "@material-ui/icons/EmailRounded";
import TokenIcon from "@material-ui/icons/VpnKeyRounded";
import LoginIcon from "@material-ui/icons/LockOpenRounded";
import DropDownIcon from "@material-ui/icons/ArrowDropDownRounded";
import { drawerOpen } from "../../state/atoms";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import Drawer from "./drawer";
import { useRecoilState } from "recoil";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(drawerOpen);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <nav className={classes.nav}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            ak.companies
          </Typography>
          <div>
            {!isAuthenticated && (
              <Button
                size="large"
                endIcon={<LoginIcon />}
                onClick={() => loginWithRedirect({})}
              >
                Log in
              </Button>
            )}

            {isAuthenticated && (
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
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
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
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer />
    </nav>
  );
};

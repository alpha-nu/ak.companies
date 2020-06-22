import React from "react";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CompaniesIcon from "@material-ui/icons/BusinessRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/HomeRounded";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

export default () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const open = true;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => {}}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem to="/" selected={pathname === "/"} component={Link} button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          to="/companies"
          selected={pathname === "/companies"}
          component={Link}
          button
        >
          <ListItemIcon>
            <CompaniesIcon />
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
      </List>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary="GitHub" />
      </ListItem>
    </Drawer>
  );
};

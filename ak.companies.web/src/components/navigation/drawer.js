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
import { useRecoilState } from "recoil";
import { drawerOpen } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import { companyCountSelector } from "../../state/selectors";

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
  const [open, setOpen] = useRecoilState(drawerOpen);
  const companyCount = useRecoilValue(companyCountSelector);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => setOpen(false)}>
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
          <ListItemText primary={`Companies (${companyCount})`} />
        </ListItem>
      </List>
      <Divider />
      <ListItem
        component="a"
        href="https://github.com/alpha-nu/ak.companies"
        target="_blank"
        button
      >
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary="Source Code" />
      </ListItem>
    </Drawer>
  );
};

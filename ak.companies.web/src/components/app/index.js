import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../auth/history";
import Home from "../../views/home";
import Companies from "../../views/companies";
import Navigation from "../navigation";
import { useAuth0 } from "../../auth/auth0-spa";
import Loading from "../loading";
import SecureRoute from "../../auth/route";
import {
  ThemeProvider,
  CssBaseline,
  unstable_createMuiStrictModeTheme,
  makeStyles,
} from "@material-ui/core";
import { RecoilRoot } from "recoil";

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const App = () => {
  const classes = useStyles();
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <Navigation />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Switch>
                <Route exact path="/" component={Home} />
                <SecureRoute exact path="/companies" component={Companies} />
              </Switch>
            </main>
          </div>
        </ThemeProvider>
      </RecoilRoot>
    </Router>
  );
};

export default App;

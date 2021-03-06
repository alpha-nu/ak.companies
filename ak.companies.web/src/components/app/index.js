import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../auth/history";
import Home from "../../views/home";
import Companies from "../../views/companies";
import NewCompany from "../../views/companies/new";
import EditCompany from "../../views/companies/update";
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
import Footer from "./footer";
import { RecoilRoot } from "recoil";
import Errors from "../errors";
import Notification from "../notification";

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    type: "light",
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
                <SecureRoute
                  exact
                  path="/companies/new"
                  component={NewCompany}
                />
                <SecureRoute
                  exact
                  path="/companies/:id"
                  component={EditCompany}
                />
              </Switch>
              <Errors />
              <Notification />
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </RecoilRoot>
    </Router>
  );
};

export default App;

import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../auth/history";
import Home from "../../views/home";
import Companies from "../../views/companies";
import NavBar from "../navigation";
import { useAuth0 } from "../../auth/auth0-spa";
import Loading from "../loading";
import SecureRoute from "../../auth/route";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute exact path="/companies" component={Companies} />
      </Switch>
    </Router>
  );
}

export default App;

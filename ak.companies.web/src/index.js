import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import history from "./auth/history";
import { Auth0Provider } from "./auth/auth0-spa";
import { audience, clientId, domain } from "./auth/config.json";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      client_id={clientId}
      audience={audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

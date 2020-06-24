import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link target="_blank" href="https://github.com/alpha-nu/ak.companies">
        ak.companies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

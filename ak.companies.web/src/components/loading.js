import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    margin: theme.spacing(8),
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid align="center" className={classes.loaderRoot}>
      <CircularProgress size={80} color="secondary" />
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Just a sec...
      </Typography>
    </Grid>
  );
};

export default Loading;

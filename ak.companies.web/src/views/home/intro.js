import React from "react";
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  Container,
} from "@material-ui/core";
import { baseUrl } from "../../api/config.json";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Companies Demo
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          A sample application showcasing, a variety of technologies, including
          MySQL, .NET Core, ReactJS, Auth0, Swagger and Docker.
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Consult the README for more info, or interact with the API directly
          using swagger UI or Postman
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                href={`${baseUrl}/swagger`}
                target="_blank"
                variant="contained"
                color="primary"
              >
                Swagger UI
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

import React from "react";
import {
  TextField,
  Button,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));

export default ({ company, setCompany, submit: { action, label } }) => {
  const { name, isin, ticker, website } = company;
  const classes = useStyles();

  const update = (property) => (e) =>
    setCompany({ ...company, [property]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {label} Company
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            label="name"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={update("name")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="ISIN"
            value={isin}
            onChange={update("isin")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Ticker"
            value={ticker}
            onChange={update("ticker")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Website"
            value={website}
            onChange={update("website")}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={action}
          >
            {label}
          </Button>
        </form>
      </div>
    </Container>
  );
};

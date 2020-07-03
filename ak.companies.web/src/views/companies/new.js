import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../../components/loading";
import { createCompany } from "../../api";
import { useApi } from "../../hooks/useApi";

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

export default () => {
  const classes = useStyles();
  const [company, setCompany] = useState({
    name: "",
    ticker: "",
    isin: "",
    website: "",
  });
  const { name, ticker, isin, website } = company;
  const { loading, action: create } = useApi({
    invoke: (token) => createCompany(token, company),
    notifyMessage: `${company.name} created successfully.`,
  });

  const update = (property) => (e) =>
    setCompany({ ...company, [property]: e.target.value });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Company
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
            onClick={create}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

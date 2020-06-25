import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth0 } from "../../auth/auth0-spa";
import Loading from "../../components/loading";
import { updateCompany } from "../../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { errors, notification } from "../../state/atoms";
import { selectedCompanySelector } from "../../state/selectors";
import { useParams, Redirect } from "react-router-dom";

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
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const setErrors = useSetRecoilState(errors);
  const setNotification = useSetRecoilState(notification);
  const selectedCompany = useRecoilValue(selectedCompanySelector);

  if (!selectedCompany) {
    return <Redirect to="/companies" />;
  }

  const [company, setCompany] = useState(selectedCompany);
  const { name, ticker, isin, website } = company;
  const update = (property) => (e) =>
    setCompany({ ...company, [property]: e.target.value });

  const create = async () => {
    try {
      setLoading(true);
      const token = await getTokenSilently();
      await updateCompany(token, { id, ...company });
      setNotification(`${company.name} updated successfully.`);
    } catch (e) {
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      } else {
        setErrors(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Company
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
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  makeStyles,
  ListItemText,
  Container,
  Typography,
} from "@material-ui/core";
import CompaniesIcon from "@material-ui/icons/BusinessRounded";
import TokenIcon from "@material-ui/icons/VpnKeyRounded";
import LoginIcon from "@material-ui/icons/LockOpenRounded";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: 460,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <List className={classes.list}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="rounded">
              <LoginIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h5">Log In</Typography>}
            secondary={
              <Typography variant="caption">
                Using Auth0 for authentication, the auth guard will allow you to
                either sign up or use your Google account to sign in
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="rounded">
              <TokenIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h5">Get your API Token</Typography>}
            secondary={
              <Typography variant="caption">
                Companies API is also secured with Auth0, once you're logged in
                here, go to <strong>Profile &gt; Token</strong> and use it ao
                authenticat in Swagger UI
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="rounded">
              <CompaniesIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h5">Manage Companies</Typography>}
            secondary={
              <Typography variant="caption">
                View a list of companies, data includes Name, ISIN, Stock Ticker
                and optionaly, a link to their website
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Container>
  );
};

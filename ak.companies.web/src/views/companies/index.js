import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  makeStyles,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { WebRounded, EditRounded } from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { allCompanies } from "../../state/atoms";
import { useAuth0 } from "../../auth/auth0-spa";
import { getCompanies } from "../../api";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const [companies, setCompanies] = useRecoilState(allCompanies);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const fetch = async () => {
      const token = await getTokenSilently();
      const data = await getCompanies(token);

      setCompanies(data);
    };

    fetch();
  });

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {companies.map(({ id, name, ticker, isin, website }) => (
          <Grid item key={id} xs={12} sm={12} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography>{ticker}</Typography>
                <Typography variant="caption">{isin}</Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="edit company">
                  <Fab size="small" color="primary">
                    <EditRounded />
                  </Fab>
                </Tooltip>
                {website && (
                  <Tooltip title="view website">
                    <Fab
                      color="primary"
                      size="small"
                      href={website}
                      target="_blank"
                    >
                      <WebRounded />
                    </Fab>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

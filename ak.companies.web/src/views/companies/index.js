import React, { useEffect, useState } from "react";
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
import { WebRounded, EditRounded, AddRounded } from "@material-ui/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allCompanies, selectedCompany } from "../../state/atoms";
import { useAuth0 } from "../../auth/auth0-spa";
import { getCompanies } from "../../api";
import Loading from "../../components/loading";
import logoIpsum1 from "../../assets/logoIpsums/1.png";
import logoIpsum2 from "../../assets/logoIpsums/2.png";
import logoIpsum3 from "../../assets/logoIpsums/3.png";
import logoIpsum4 from "../../assets/logoIpsums/4.png";
import { Link } from "react-router-dom";
import { errors } from "../../state/atoms";

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

const getRandomLogo = () => {
  return [logoIpsum1, logoIpsum2, logoIpsum3, logoIpsum4][
    Math.floor(Math.random() * 4)
  ];
};

export default () => {
  const classes = useStyles();
  const [companies, setCompanies] = useRecoilState(allCompanies);
  const { getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const setSelectedCompany = useSetRecoilState(selectedCompany);
  const setError = useSetRecoilState(errors);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = await getTokenSilently();
        const data = await getCompanies(token);

        setCompanies(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [getTokenSilently, setCompanies, setError, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: "end" }}>
          <Fab component={Link} to="/companies/new" variant="extended">
            <AddRounded color="action" /> New Company
          </Fab>
        </Grid>
        {companies.map(({ id, name, ticker, isin, website }) => (
          <Grid item key={id} xs={12} sm={12} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={getRandomLogo()}
                title="Logo"
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
                  <Fab
                    onClick={() => {
                      setSelectedCompany({ name, ticker, isin, website });
                    }}
                    component={Link}
                    to={`/companies/${id}`}
                    size="small"
                  >
                    <EditRounded color="action" />
                  </Fab>
                </Tooltip>
                {website && (
                  <Tooltip title="view website">
                    <Fab size="small" href={website} target="_blank">
                      <WebRounded color="action" />
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

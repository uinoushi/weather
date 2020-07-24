import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import Barchart from "../../components/Barchart";
import Switch from "./Switch";
import Forecasts from "./Forecasts";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.layout.maxWidth,
    margin: theme.spacing(0, "auto"),
    padding: theme.spacing("1rem", 0),

    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  header: {
    padding: theme.spacing(1),
  },
  alignRight: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
}));

const WeatherScreen = () => {
  const classes = useStyles();
  const forecast = useSelector((state) => state.forecast);

  if (forecast.list.length === 0) {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2" color="textSecondary">
              {forecast.city.name}, {forecast.city.country}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            className={classes.alignRight}
          >
            <Switch />
          </Grid>
        </Grid>
      </div>

      <Forecasts units={forecast.units} />
      <Barchart data={forecast.barchart} />
    </div>
  );
};

export default WeatherScreen;

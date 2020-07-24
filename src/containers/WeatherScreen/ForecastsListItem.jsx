import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
} from "@material-ui/core";
import { OPEN_WEATHER_MAP_URL } from "../../utils/constants";
import WindIcon from "./wind.svg";
import HumidityIcon from "./humidity.svg";
import ThermometerIcon from "./thermometer.svg";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    boxSizing: "border-box",
  },
  weatherIcon: {
    width: 64,
    height: 64,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
  },
  cardFooterText: {
    fontSize: theme.typography.fontSize,
  },
  card: {
    background: "linear-gradient(45deg, #0277bd 30%, #4fc3f7 90%)",
    color: "white",
  },
  active: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  temp: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  info: {
    textTransform: "capitalize",
    marginBottom: theme.spacing(4),
    fontSize: 12,
  },
}));

const ForecastsListItem = ({
  forecast,
  index,
  sliderChange,
  metric,
  selected,
}) => {
  const classes = useStyles();

  const {
    tempC,
    tempCMax,
    tempCMin,
    tempF,
    tempFMax,
    tempFMin,
    humidity,
    date,
    description,
    icon,
    wind,
  } = forecast;

  return (
    <div className={classes.item}>
      <Card
        className={`${index === selected ? classes.active : classes.card}`}
        onClick={() => sliderChange(index)}
      >
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={8} sm container>
              <Grid item xs={12}>
                <Typography className={classes.date}>{date}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.temp}
                  variant="h5"
                  component="h2"
                >
                  {metric === "imperial" ? `${tempF} °F` : `${tempC} °C`}
                </Typography>
              </Grid>

              <Typography className={classes.info}>{description}</Typography>
            </Grid>
            <Grid item>
              <Avatar
                alt={description}
                className={classes.weatherIcon}
                src={`${OPEN_WEATHER_MAP_URL}/img/wn/${icon}@2x.png`}
              />
            </Grid>
          </Grid>
          <Grid item sm container>
            <Grid item xs={4}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar
                  alt={description}
                  className={classes.icon}
                  src={ThermometerIcon}
                />
                <Typography className={classes.cardFooterText}>
                  {metric === "imperial"
                    ? `${tempFMax} / ${tempFMin}`
                    : `${tempCMax} / ${tempCMin}`}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  alt={description}
                  className={classes.icon}
                  src={WindIcon}
                />
                <Typography className={classes.cardFooterText}>
                  {wind} km/h
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  alt="Remy Sharp"
                  className={classes.icon}
                  src={HumidityIcon}
                />
                <Typography className={classes.cardFooterText}>
                  {humidity}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastsListItem;

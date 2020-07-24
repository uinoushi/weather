import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchWeather, setError } from "../../store/forecast";
import history from "../../history";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const SplashScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    getPosition()
      .then((position) => {
        dispatch(fetchWeather(position));
      })
      .catch((err) => {
        dispatch(setError("Please enable location and try again."));
        history.push("/locationNotFound");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default SplashScreen;

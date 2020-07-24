import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "forecast",
  initialState: {
    list: [],
    city: {},
    barchart: [],
    selected: [],
    units: "imperial",
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    weatherRequested: (forecast) => {
      forecast.loading = true;
    },

    weatherReceived: (forecast, action) => {
      forecast.list = action.payload.list;
      forecast.city = action.payload.city;
      forecast.lastFetch = Date.now();
      forecast.barchart = [];
      forecast.loading = false;
    },

    weatherRequestFailed: (forecast) => {
      forecast.loading = false;
    },

    updateUnits: (forecast, action) => {
      forecast.units = action.payload;
    },

    buildBarchart: (forecast, action) => {
      forecast.barchart = action.payload.data;
    },

    selectForecast: (forecast, action) => {
      forecast.selected = action.payload;
    },

    resetForecast: (forecast, action) => {
      forecast.barchart = [];
      forecast.selected = [];
    },

    setError: (forecast, action) => {
      forecast.error = action.payload;
    },
  },
});

export const {
  weatherReceived,
  weatherRequested,
  weatherRequestFailed,
  updateUnits,
  buildBarchart,
  selectForecast,
  resetForecast,
  setError,
} = slice.actions;

export default slice.reducer;

// Action Creators
export const fetchWeather = (position) => (dispatch, getState) => {
  const { lastFetch } = getState().forecast;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  const { latitude, longitude } = position.coords;
  const url = `/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=40&units=metric`;

  return dispatch(
    apiCallBegan({
      url,
      onStart: weatherRequested.type,
      onSuccess: weatherReceived.type,
      onError: weatherRequestFailed.type,
    })
  );
};

export const groupedForecastList = createSelector(
  (state) => state.forecast,
  (forecast) =>
    forecast.list.reduce((accumulator, currentValue) => {
      const date = moment(currentValue.dt_txt).format("DD");

      accumulator[date] = [...(accumulator[date] || []), currentValue];
      return accumulator;
    }, {})
);

export const populateBarchartData = () => (dispatch, getState) => {
  const { units, selected } = getState().forecast;
  const m = units === "metric" ? "C" : "F";

  if (!selected) {
    return;
  }

  const data = [
    ...selected.map((daily) => {
      return {
        name: m === "C" ? `${daily.tempC} ${m}` : `${daily.tempF} ${m}`,
        temp: m === "C" ? daily.tempC : daily.tempF,
      };
    }),
  ];

  return dispatch(
    buildBarchart({
      data,
    })
  );
};

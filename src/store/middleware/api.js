import axios from "axios";
import moment from "moment";
import history from "../../history";
import * as actions from "../api";

const roundFloat = (number) => Number(number).toFixed();

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "https://api.openweathermap.org",
      url,
      method,
      data,
    });

    const structuredData = await [
      ...response.data.list.map((x) => {
        return {
          tempC: roundFloat(x.main.temp),
          tempCMax: roundFloat(x.main.temp_max),
          tempCMin: roundFloat(x.main.temp_min),
          tempF: roundFloat(x.main.temp * 1.8 + 32),
          tempFMax: roundFloat(x.main.temp_max * 1.8 + 32),
          tempFMin: roundFloat(x.main.temp_min * 1.8 + 32),
          humidity: x.main.humidity,
          date: moment(x.dt_txt).format("DD MMM YY"),
          dt_txt: x.dt_txt,
          dt: x.dt,
          description: x.weather[0].description,
          icon: x.weather[0].icon,
          wind: roundFloat((x.wind.speed * (60 * 60)) / 1000),
        };
      }),
    ];

    if (onSuccess) {
      dispatch({
        type: onSuccess,
        payload: { list: structuredData, city: response.data.city },
      });
      setTimeout(() => {
        history.push("/weatherapp");
      }, 500);
    }
  } catch (error) {
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;

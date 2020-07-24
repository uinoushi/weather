import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../../components/Carousel";
import ForecastsListItem from "./ForecastsListItem";
import {
  groupedForecastList,
  selectForecast,
  resetForecast,
  populateBarchartData,
} from "../../store/forecast";

const Forecasts = ({ units }) => {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const forecasts = useSelector(groupedForecastList);
  const keys = Object.keys(forecasts);

  let content = <div />;

  const showBarchart = (index) => {
    setSelected(index);
    dispatch(selectForecast(forecasts[keys[index]]));
    dispatch(populateBarchartData());
  };

  const sliderChange = () => {
    setSelected(null);
    dispatch(resetForecast());
  };

  if (keys) {
    content = keys.map((forecast, index) => (
      <ForecastsListItem
        forecast={forecasts[forecast][0]}
        key={index}
        selected={selected}
        index={index}
        metric={units}
        sliderChange={showBarchart}
      />
    ));
  }

  return <Carousel sliderChange={sliderChange}>{content}</Carousel>;
};

export default Forecasts;

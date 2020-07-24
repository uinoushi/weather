import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { updateUnits, populateBarchartData } from "../../store/forecast";

const CustomRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    "&$checked": {
      color: theme.palette.primary.dark,
    },
  },
  checked: {},
}))((props) => <Radio {...props} />);

const Switch = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("imperial");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    dispatch(updateUnits(event.target.value));
    dispatch(populateBarchartData());
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="forcast"
        name="forcast"
        value={value}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="metric"
          control={<CustomRadio />}
          color="textSecondary"
          label="Celcius"
        />
        <FormControlLabel
          value="imperial"
          control={<CustomRadio />}
          color="textSecondary"
          label="Fahrenheit"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Switch;

import React from "react";
import {Grid} from '@material-ui/core';
import SingleDayWeather from "./SingleDayWeather";

interface IProps {
  city: any,
  weatherDataToday: any,
  isWeekly: any,
  isFahrenheit: boolean,
}

const CityToday: React.FC<IProps> = ({city, weatherDataToday, isWeekly, isFahrenheit}) => {

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <SingleDayWeather
        city={city}
        dayWeather={weatherDataToday}
        isWeekly={isWeekly}
        isFahrenheit={isFahrenheit}
      />
      <div>
        <p>{weatherDataToday.weatherText}</p>
      </div>
    </Grid>
  );
}

export default CityToday;

import React from "react";
import {Grid} from '@material-ui/core';
import SingleDayWeather from "./SingleDayWeather";

interface IProps {
  city: any,
  weatherDataWeek: any,
  isWeekly: any,
  isFahrenheit: boolean,
}

const CityFiveDay: React.FC<IProps> = ({city, weatherDataWeek, isWeekly, isFahrenheit}) => {

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {weatherDataWeek.map((day: any, index: any) => (
          <SingleDayWeather
            key={index}
            city={city}
            dayWeather={day}
            isWeekly={isWeekly}
            isFahrenheit={isFahrenheit}
          />
        ))}
      </Grid>
    </div>
    
  );
}

export default CityFiveDay;

import React, { useEffect } from "react";
import {CardHeader, Avatar} from '@material-ui/core';

interface IProps {
  city: any,
  dayWeather: any,
  isWeekly: any,
  isFahrenheit: boolean,
}

const SingleDayWeather: React.FC<IProps> = ({ city, dayWeather, isWeekly, isFahrenheit }) => {

  useEffect(() => {
  }, [isFahrenheit])

  return (
    <div >
      <CardHeader
        avatar={
          <Avatar 
            alt="weather-icon"
            src={`https://developer.accuweather.com/sites/default/files/${dayWeather.weatherIcon}-s.png`} 
        />}
        title={isWeekly ? new Date(dayWeather.date).toLocaleString('en', {weekday: 'long'}) : city}
        subheader={isFahrenheit ? `${dayWeather.temperatureFahrenheit}°F` : `${dayWeather.temperatureCelsius}°C`}
      />
    </div>
  );
}

export default SingleDayWeather;

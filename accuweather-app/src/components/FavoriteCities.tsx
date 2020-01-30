import React from 'react';
import {Card, Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CityToday from '../components/CityToday';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';


interface IProps {
  favoriteCities: any
  handleCity: any
  isFahrenheit: boolean
}

const FavoriteCities: React.FC<IProps> = ({ 
  favoriteCities,
  handleCity,
  isFahrenheit,
}) => {
  
  return (
    <div>
      {favoriteCities && favoriteCities.length !== 0 && favoriteCities.map((city: any, index: any) => (
        <Box pt={1} key={index}>
          <Card>
            <RouterLink
              to={`/main`}
              onClick={handleCity.bind(null, city)}
            >
              <CityToday 
                city={city.cityName}
                weatherDataToday={city}
                isWeekly={false}
                isFahrenheit={isFahrenheit}
              />
            </RouterLink>
          </Card>
        </Box>
      ))}
    </div>
    
  );
};

export default FavoriteCities;

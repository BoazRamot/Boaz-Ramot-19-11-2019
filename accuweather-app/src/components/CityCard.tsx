import React from 'react';
import {Card, CardActions, CardContent, CardHeader} from '@material-ui/core';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CityToday from './CityToday';
import CityFiveDay from './CityFiveDay';
import { addToFavoritesAction, removeFromFavoritesAction } from '../store/actions/action.citiesDataReducer';
import { setCityLatLngAction } from '../store/actions/action.mapDataMiddleware';

interface IProps {
  fiveDayForcast: any
  city: any
  isFavorites: boolean
  isFahrenheit: boolean
  favoriteCities: any
  addToFavorites: Function
  removeFromFavorites: Function
  setCityLatLng: Function
}

const CityCard: React.FC<IProps> = ({ 
  isFavorites, 
  fiveDayForcast, 
  city, 
  favoriteCities,
  removeFromFavorites,
  isFahrenheit,
  setCityLatLng,
}) => {

  const isfavoriteCity = () => {
    return favoriteCities.filter((favoriteCity: any) => favoriteCity.code === city.code).length === 0 ? false : true
  }

  const handleFavorite = () => {
    if (isfavoriteCity()) {
      removeFromFavorites(city.code)
    } else {
      setCityLatLng(city)
    }
  }

  console.log('favoriteCities', favoriteCities)

  return (
    <div>
      <Card style={{backgroundColor: "#FEF2F2"}}>
        <CardActions>
          <CardHeader
            avatar={
              <IconButton aria-label="settings"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleFavorite}
                          color="inherit"
              >
                {isfavoriteCity() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>}
              title= { (isfavoriteCity() ? "Remove from " : "Add to ") + "favorites" }
          />
        </CardActions>
        <CardContent>
          <CityToday 
            city={city.label}
            weatherDataToday={isFavorites ? (true) : fiveDayForcast[0]}
            isWeekly={false}
            isFahrenheit={isFahrenheit}
          />
        </CardContent>
        <CardContent>
          <CityFiveDay
            city={city.label}
            weatherDataWeek={fiveDayForcast}
            isWeekly={true}
            isFahrenheit={isFahrenheit}
          />
        </CardContent>
      </Card>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  city: state.cities.city,
  fiveDayForcast: state.cities.fiveDayForcast,
  favoriteCities: state.cities.favoriteCities,
  isFahrenheit: state.user.isFahrenheit,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToFavorites: (payload: any) => dispatch(addToFavoritesAction(payload)),
  removeFromFavorites: (payload: any) => dispatch(removeFromFavoritesAction(payload)),
  setCityLatLng: (city: any) => dispatch(setCityLatLngAction(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);
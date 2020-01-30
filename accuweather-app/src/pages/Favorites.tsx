import React, { useEffect, useState } from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Card, Box} from "@material-ui/core";
import {resetPageNotFoundAction} from "../store/actions/action.userDataReducer";
import Grid from "@material-ui/core/Grid";
import { getTodayForcastAction } from '../store/actions/action.citiesApiMiddleware';
import CityToday from '../components/CityToday';
import {Link as RouterLink} from 'react-router-dom';
import { setCityAction, setShowCitiesAction } from '../store/actions/action.citiesDataReducer';
import clsx from 'clsx';
import useStyles from '../helpers/useStyles';
import { resetMarkerAction } from '../store/actions/action.googleMapReducer';
import { resetAddressAction } from '../store/actions/action.mapReducer';
import FavoriteCities from '../components/FavoriteCities';

interface IProps {
  resetAddress: Function
  resetMarker: Function
  setShowCities: Function
  setCity: Function
  getTodayForcast: Function
  resetPageNotFound: Function
  isFahrenheit: boolean
  pageNotFound: boolean
  getFavorites: boolean
  showCities: boolean
  isOpen: boolean
  favoritesMap: Function
  // favorites: any
  markersMap: any
  favoriteCities: any
}

const Favorites: React.FC<IProps> = ({ 
  pageNotFound, 
  resetPageNotFound, 
  // favorites, 
  setCity, 
  isFahrenheit,
  isOpen,
  showCities,
  setShowCities,
  markersMap,
  resetMarker,
  resetAddress,
  favoriteCities,
  getTodayForcast,
  getFavorites,
}) => {
  const [cities, setCities] = useState([])

  const classes = useStyles();

  useEffect(() => {
    if (pageNotFound) {
      resetPageNotFound();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('Favorites favoriteCities', favoriteCities);
    setCities(favoriteCities);
    setShowCities(true);
    // if (favoriteCities && favoriteCities[0] && favoriteCities[0].lat) {
      // console.log("favoriteCities now!!!!");
    // }
  }, [getFavorites])

  useEffect(() => {
    console.log('Favorites getFavorites', getFavorites);
    if (!getFavorites) {
      console.log("now!!!!");
    }
  }, [getFavorites])

  // useEffect(() => {
  //   // console.log('favorites', favorites)
  //   console.log('favoriteCities', favoriteCities)
  //   // if (!showCities && favorites && favorites.lenght > 1) {
  //   // if (favorites && favorites.lenght > 1) {
  //   if (getFavorites && favoriteCities && favoriteCities.lenght > 1) {
  //     resetAddress();
  //     // if (markersMap && markersMap.size !== 0) {
  //       markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //       resetMarker();
  //     // }
  //     // console.log('favorites', favorites)
  //     console.log('favoriteCities', favoriteCities);
  //     (async () => {
  //       // getTodayForcast(favoriteCities)
  //       await getTodayForcast(favoriteCities)
  //       await setShowCities(true);
  //       })();
  //     // setShowCities(true);
  //   }
  //   // eslint-disable-next-line
  // }, [getFavorites]);

  const handleCity = (city: any) => {
    // if (favorites && favorites.lenght > 1) {
    if (favoriteCities && favoriteCities.lenght > 1) {
      setCity({label: city.cityName, value: "", code: city.cityCode})
    }
  };

  return (cities.length === 0) ? null : (
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: isOpen,
      })}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <FavoriteCities
          favoriteCities={favoriteCities}
          handleCity={handleCity}
          isFahrenheit={isFahrenheit}
        />
      </Grid>
    </div>
    
  );
};

const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
  isFahrenheit: state.user.isFahrenheit,
  favorites: state.cities.favorites,
  getFavorites: state.cities.getFavorites,
  isOpen: state.map.open,
  showCities: state.cities.showCities,
  markersMap: state.googleMap.markersMap,
  favoriteCities: state.cities.favoriteCities,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShowCities: (payload: any) => dispatch(setShowCitiesAction(payload)),
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
  getTodayForcast: (payload: any) => dispatch(getTodayForcastAction(payload)),
  setCity: (payload: any) => dispatch(setCityAction(payload)),
  resetMarker: () => dispatch(resetMarkerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);

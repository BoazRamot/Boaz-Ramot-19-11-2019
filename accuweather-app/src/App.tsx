import {
  Box,
  createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import Header from './components/Header';
import PageNotFound from "./pages/PageNotFound";
import Main from './pages/Main';
import Favorites from './pages/Favorites';
import { getTodayForcastAction, getGeolocationAction } from './store/actions/action.citiesApiMiddleware';
import MapDrawer from './components/MapDrawer';
import useStyles from './helpers/useStyles';
import { saveMapDataNowAction } from './store/actions/action.mapDataMiddleware';
import { resetMarkerAction } from './store/actions/action.googleMapReducer';
import { resetAddressAction } from './store/actions/action.mapReducer';

interface IProps {
  resetAddress: Function
  resetMarker: Function
  pageNotFound: boolean;
  getGeolocation: Function
  getTodayForcast: Function
  getFavorites: boolean
  favorites: any
  favoriteCities: any
  saveMapDataNow: Function;
  markersMap: any
}

const App: React.FC<IProps> = ({ 
  pageNotFound,
  favorites,
  getFavorites,
  getTodayForcast,
  favoriteCities,
  getGeolocation,
  saveMapDataNow,
  markersMap,
  resetMarker,
  resetAddress,
}) => {


  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#855E42',
      },
    },
  });

  useEffect(() => {
    window.addEventListener('beforeunload', saveOnRefresh);

    return () => {
      window.removeEventListener('beforeunload', saveOnRefresh);
    };
    // eslint-disable-next-line
  }, []);

  const saveOnRefresh = () => {
    saveMapDataNow();
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const { latitude, longitude } = position.coords;
          // getGeolocation({latitude, longitude})
    })} 
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   // console.log('favorites', favorites)
  //   console.log('favoriteCities', favoriteCities)
  //   console.log('getFavorites', getFavorites)
  //   // if (!showCities && favorites && favorites.lenght > 1) {
  //   // if (favorites && favorites.lenght > 1) {
  //   // if (getFavorites && favoriteCities && favoriteCities.lenght > 1) {
  //   if (getFavorites) {
  //     resetAddress();
  //     // if (markersMap && markersMap.size !== 0) {
  //       markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //       resetMarker();
  //     // }
  //     // console.log('favorites', favorites)
  //     console.log('favoriteCities', favoriteCities);
  //     // (async () => {
  //       getTodayForcast(favoriteCities)
  //       // await getTodayForcast(favoriteCities)
  //       // await setShowCities(true);
  //       // })();
  //     // setShowCities(true);
  //   }
  //   // eslint-disable-next-line
  // }, [getFavorites]);

  // useEffect(() => {
  //   if (getFavorites) {
  //     getTodayForcast(favoriteCities)
  //   } 
  //   // eslint-disable-next-line
  // }, [getFavorites]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <div className={classes.root}>
            <MapDrawer/>
            <Box pt={pageNotFound ? 0 : 7}>
              <Switch>
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/main" component={Main} />
                <Route exact path="/" component={Main} />
                <Route path="/" component={PageNotFound} />
              </Switch>
            </Box>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
  favorites: state.cities.favorites,
  getFavorites: state.cities.getFavorites,
  favoriteCities: state.cities.favoriteCities,
  markersMap: state.googleMap.markersMap,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTodayForcast: (payload: any) => dispatch(getTodayForcastAction(payload)),
  getGeolocation: (payload: any) => dispatch(getGeolocationAction(payload)),
  saveMapDataNow: () => dispatch(saveMapDataNowAction()),
  resetMarker: () => dispatch(resetMarkerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
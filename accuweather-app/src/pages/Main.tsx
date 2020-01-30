import React, { useEffect } from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Button, Box} from "@material-ui/core";
import {resetPageNotFoundAction} from "../store/actions/action.userDataReducer";
import Grid from "@material-ui/core/Grid";
import DropdownSelect from "../components/DropdownSelect";
import CityCard from '../components/CityCard';
import { setCityAction } from '../store/actions/action.citiesDataReducer';
import { getFiveDayForcastAction, getLocationsAction } from '../store/actions/action.citiesApiMiddleware';
import useStyles from '../helpers/useStyles';
import { openDrawerAction, resetAddressAction } from '../store/actions/action.mapReducer';
import clsx from 'clsx';
import { resetMarkerAction } from '../store/actions/action.googleMapReducer';

interface IProps {
  resetAddress: Function
  resetMarker: Function
  openDrawer: Function
  getLocations: Function
  getFiveDayForcast: Function
  setCity: Function
  resetPageNotFound: Function
  pageNotFound: boolean
  isOpen: boolean
  city: any
  fiveDayForcast: any
  locations: any
  markersMap: any
}

const Main: React.FC<IProps> = ({
  locations, 
  getLocations, 
  pageNotFound, 
  resetPageNotFound, 
  setCity, 
  city, 
  getFiveDayForcast, 
  fiveDayForcast,
  openDrawer,
  isOpen,
  markersMap,
  resetMarker,
  resetAddress,
}) => {

  const classes = useStyles();

  useEffect(() => {
    if (city.code) {
      getFiveDayForcast(city);
    }
    // eslint-disable-next-line
  }, [city]);
  
  useEffect(() => {
    if (pageNotFound) {
      resetPageNotFound();
    }
    // eslint-disable-next-line
  }, []);

  const handleOpenMap = () => {
    openDrawer();
  };

  return (
    <Box 
      className={clsx(classes.content, {
        [classes.contentShift]: isOpen,
      })}
    >
      <Grid
        container
        direction="column"
        wrap='nowrap'
        justify="center"
        alignItems="center"
        className={classes.toogleRoot}
      >
        <h1 >Weather Forcast</h1>
        <DropdownSelect
          locations={locations}
          setCity={setCity}
          getLocations={getLocations}
          markersMap={markersMap}
          resetMarker={resetMarker}
          resetAddress={resetAddress}
        />
        <Button onClick={handleOpenMap}>open map</Button>
        {city && fiveDayForcast && fiveDayForcast.constructor === Array && fiveDayForcast.length !== 0 &&
          <CityCard isFavorites={false}/>
        }
      </Grid>
    </Box>
    
  );
};


const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
  city: state.cities.city,
  fiveDayForcast: state.cities.fiveDayForcast,
  locations: state.cities.locations,
  isOpen: state.map.open,
  markersMap: state.googleMap.markersMap,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
  setCity: (payload: any) => dispatch(setCityAction(payload)),
  getFiveDayForcast: (payload: any) => dispatch(getFiveDayForcastAction(payload)),
  getLocations: (payload: any) => dispatch(getLocationsAction(payload)),
  openDrawer: () => dispatch(openDrawerAction()),
  resetMarker: () => dispatch(resetMarkerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

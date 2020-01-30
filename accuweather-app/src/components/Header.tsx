import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {Link as RouterLink, NavLink} from "react-router-dom";
import { setUnitAction } from '../store/actions/action.userDataReducer';
import { getFavoritesDataSetAction } from '../store/actions/action.citiesDataReducer';
import { resetMarkerAction } from '../store/actions/action.googleMapReducer';
import { resetAddressAction } from '../store/actions/action.mapReducer';
import { getTodayForcastAction } from '../store/actions/action.citiesApiMiddleware';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'fixed',
      left: 0,
      top: 0,
    },
  }),
);

interface IProps {
  getFavorites: boolean;
  pageNotFound: boolean;
  setUnit: Function;
  getFavoritesDataSet: Function;
  resetMarker: Function
  resetAddress: Function
  getTodayForcast: Function
  favoriteCities: any
  markersMap: any
}

const Header: React.FC<IProps> = ({ 
  pageNotFound, 
  setUnit, 
  getFavoritesDataSet ,
  resetMarker,
  resetAddress,
  getTodayForcast,
  favoriteCities,
  markersMap,
  getFavorites,
}) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.checked)
    setState({ ...state, [name]: event.target.checked });
  };
  const classes = useStyles();

  const handleFavorites = () => {
    if (!getFavorites) {
      return;
    }
    // getFavoritesDataSet();
    resetAddress();
    markersMap.forEach((marker: any, user: any) => marker.setMap(null));
    resetMarker();
    console.log('handleFavorites favoriteCities', favoriteCities);
    getTodayForcast(favoriteCities)
  }

  return (
    <div style={{display: pageNotFound ? 'none' : ''}} className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <RouterLink to={`/`}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Typography variant="h6" className={classes.title} style={{color: "white", marginRight: '7px'}}>
                Accuweather App
              </Typography>
            </IconButton>
          </RouterLink>
          <div className={classes.title}></div>
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange('checkedA')}
                value="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="°C"
            labelPlacement="start"
          />
          <Typography variant="h6" className={classes.title} style={{color: "white", marginRight: '7px'}}>
            °F
          </Typography>
          <Box p={1}>
            <NavLink exact to="/" className="nav-link" activeClassName="nav-link-active">
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Home
              </Typography>
            </NavLink>
          </Box>
          <Box>
            <NavLink exact to="/favorites" className="nav-link" activeClassName="nav-link-active" onClick={handleFavorites}>
              <Typography variant="h6" className="mx-3 cursor-pointer">
                Favorites
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
  favoriteCities: state.cities.favoriteCities,
  markersMap: state.googleMap.markersMap,
  getFavorites: state.cities.getFavorites,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUnit: (payload: any) => dispatch(setUnitAction(payload)),
  getFavoritesDataSet: () => dispatch(getFavoritesDataSetAction()),
  resetMarker: () => dispatch(resetMarkerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
  getTodayForcast: (payload: any) => dispatch(getTodayForcastAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store } from '../../index';
import { MAP_DATA_SET, SET_CITY_LAT_LNG } from '../actions/action.mapDataMiddleware';
import { setRedirectAction } from '../actions/action.mapReducer';
import { addToFavoritesAction } from '../actions/action.citiesDataReducer';

// To save map data if user press refresh
const saveMapData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === MAP_DATA_SET) {
    const map = store.getState().googleMap.map;
    let address = store.getState().map.address;
    let mapZoom: number;
    let latLng: { lat: any; lng: any };
    let mapCentre: { lat: any; lng: any };
    let numOfMarkers: number;
    const markersMap = store.getState().googleMap.markersMap;
    address = store.getState().map.address;
    mapZoom = map.getZoom();
    mapCentre = map.getCenter();
    latLng = { lat: mapCentre.lat(), lng: mapCentre.lng() };
    numOfMarkers = 0;
    if (markersMap) {
      console.log('saveMapData clean');
      numOfMarkers = markersMap.size;
      markersMap.forEach((marker: any, user: any) => marker.setMap(null));
    }
    dispatch(setRedirectAction( latLng, mapCentre, mapZoom, numOfMarkers, address ));
  }
  return next(action);
};

const getCityLatLng: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  console.log('next state', store.getState());
  if (action.type === SET_CITY_LAT_LNG) {
    const city = action.city;
    const maps = store.getState().googleMap.maps;
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ 'address': `${city.label}, ${city.value}` }, (results: any, status: any) => {
    if (status === 'OK') {
      if (results[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          city.lat = lat;
          city.lng = lng;
          console.log('city', city)
        }
      } 
    });
    dispatch(addToFavoritesAction(city));
  }
  return next(action);
};

export const mapDataMiddleware = [saveMapData, getCityLatLng];

// action types

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const RESET_ADDRESS = 'RESET_ADDRESS';
export const ADD_LAT_LNG = 'ADD_LAT_LNG';
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const SET_REDIRECT = 'SET_REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';
export const ADD_MARKER_LAT_LNG = 'ADD_MARKER_LAT_LNG';

// action creators

export const addAddressAction = (address: string) => {
  return { type: ADD_ADDRESS, address };
};

export const resetAddressAction = () => {
  return { type: ADD_ADDRESS };
};

export const addLatLngAction = (latLng: any) => {
  return { type: ADD_LAT_LNG, latLng };
};

export const openDrawerAction = () => {
  return { type: OPEN_DRAWER };
};

export const closeDrawerAction = () => {
  return { type: CLOSE_DRAWER };
};

export const resetRedirectAction = () => {
  return { type: RESET_REDIRECT };
};

export const addMarkerLatLngAction = (latLng: any) => {
  return { type: ADD_MARKER_LAT_LNG, latLng };
};

export const setRedirectAction = (
  latLng: any,
  mapCentre: any,
  mapZoom: any,
  numOfMarkers: any,
  address: string,
) => {
  return {
    type: SET_REDIRECT,
    latLng,
    mapCentre,
    mapZoom,
    numOfMarkers,
    address,
  };
};
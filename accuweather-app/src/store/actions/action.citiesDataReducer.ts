// action types

export const SET_CITY = 'SET_CITY';
export const SET_FIVE_DAY_FORCAST_DATA_SET = 'SET_FIVE_DAY_FORCAST_DATA_SET';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SET_FAVORITES_DATA_SET = 'SET_FAVORITES_DATA_SET';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SHOW_CITIES = 'SHOW_CITIES';
export const GET_FAVORITES_DATA_SET = 'GET_FAVORITES_DATA_SET';

// action creators

export const getFavoritesDataSetAction = () => {
  return { type: GET_FAVORITES_DATA_SET };
};

export const setShowCitiesAction = (payload: any) => {
  return { type: SHOW_CITIES, payload };
};

export const setFavoritesDataSetAction = (payload: any) => {
  return { type: SET_FAVORITES_DATA_SET, payload };
};

export const setCityAction = (payload: any) => {
  return { type: SET_CITY, payload };
};

export const setFiveDayForcastDataSetAction = (payload: any) => {
  return { type: SET_FIVE_DAY_FORCAST_DATA_SET, payload };
};

export const setLocationsAction = (payload: any) => {
  return { type: SET_LOCATIONS, payload };
};

export const addToFavoritesAction = (payload: any) => {
  return { type: ADD_TO_FAVORITES, payload };
};

export const removeFromFavoritesAction = (payload: any) => {
  return { type: REMOVE_FROM_FAVORITES, payload };
};
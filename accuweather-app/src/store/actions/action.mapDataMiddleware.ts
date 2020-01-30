// action types

export const MAP_DATA_SET = 'MAP_DATA_SET';
export const SET_CITY_LAT_LNG = 'SET_CITY_LAT_LNG';

// action creators

export const saveMapDataNowAction = () => {
  return { type: MAP_DATA_SET };
};

export const setCityLatLngAction = (city: any) => {
  return { type: SET_CITY_LAT_LNG, city };
};

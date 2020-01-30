// action types

export const CITIES_API_GET_FIVE_DAY_FORCAST = 'CITIES_API_GET_FIVE_DAY_FORCAST';
export const CITIES_API_GET_LOCATIONS = 'CITIES_API_GET_LOCATIONS';
export const CITIES_API_GET_TODAY_FORCAST = 'CITIES_API_GET_TODAY_FORCAST';
export const CITIES_API_GET_GEOLOCATION = 'CITIES_API_GET_GEOLOCATION';


// action creators

export const getFiveDayForcastAction = (payload: any) => {
  return { type: CITIES_API_GET_FIVE_DAY_FORCAST, payload };
};

export const getLocationsAction = (payload: any) => {
  return { type: CITIES_API_GET_LOCATIONS, payload };
};

export const getTodayForcastAction = (payload: any) => {
  return { type: CITIES_API_GET_TODAY_FORCAST, payload };
};

export const getGeolocationAction = (payload: any) => {
  return { type: CITIES_API_GET_GEOLOCATION, payload };
};
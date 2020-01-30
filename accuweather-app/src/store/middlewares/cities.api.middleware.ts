import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import axios from "axios";
import { DayForecasts } from '../../models/DayForecasts';
import { CITIES_API_GET_FIVE_DAY_FORCAST, CITIES_API_GET_LOCATIONS, CITIES_API_GET_TODAY_FORCAST, CITIES_API_GET_GEOLOCATION } from '../actions/action.citiesApiMiddleware';
import { setFiveDayForcastDataSetAction, setLocationsAction, setFavoritesDataSetAction, setCityAction, setShowCitiesAction } from '../actions/action.citiesDataReducer';
import { addLatLngAction, addAddressAction } from '../actions/action.mapReducer';
import keys from '../../config/keys';
const baseUrl = 'http://dataservice.accuweather.com';
const locationsUrl = 'locations/v1/cities';
const apiKey = process.env.ACCUWEATHER_API_KEY || keys.accuweatherApiKey;

const getFiveDayForcast: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === CITIES_API_GET_FIVE_DAY_FORCAST) {
    const city = action.payload;
    (async () => {
      try {
        const url = `${baseUrl}/forecasts/v1/daily/5day/${city.code}?apikey=${apiKey}&details=true`;
        const forecast = await axios.get(url);
        let fiveDayForecasts: any = [];
        // eslint-disable-next-line
        forecast.data.DailyForecasts.map((day: any) => {
          const dayForecasts = new DayForecasts(day);
          fiveDayForecasts = [...fiveDayForecasts, dayForecasts];
        });
        dispatch(addAddressAction(`${city.label}, ${city.value}`));
        dispatch(setFiveDayForcastDataSetAction(fiveDayForecasts));
      } catch (error) {
        console.error('forecast Fetch Failed', error);
      }
    })();
  }
  return next(action);
};

const getTodayForcast: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === CITIES_API_GET_TODAY_FORCAST) {
    const citiesMap = action.payload;
    (async () => {
      try {
        const cities: any = [];
        citiesMap.map(async (city: any) => {
          const url = `${baseUrl}/currentconditions/v1/${city.code}?apikey=${apiKey}`;
          const forecast = await axios.get(url);
          console.log('forecast', forecast)
          const dayForecasts = new DayForecasts(forecast.data[0], true, city.label, city.code, city.lat, city.lng);
          console.log('dayForecasts', dayForecasts)
          cities.push(dayForecasts)
        })
        console.log('getTodayForcast cities', cities)
        dispatch(setFavoritesDataSetAction(cities));
      } catch (error) {
        console.error('forecast Fetch Failed', error);
      }
    })();
  }
  return next(action);
};

const getLocations: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === CITIES_API_GET_LOCATIONS) {
    const city = action.payload;
    (async () => {
      try {
        const url = `${baseUrl}/${locationsUrl}/autocomplete?apikey=${apiKey}&q=${city}`;
        const locations = await axios.get(url);
        // const cities = [];
        for (let location of locations.data) {
          let label = location.AdministrativeArea.LocalizedName;
          let value = location.Country.LocalizedName;
          let code = location.Key;
          dispatch(setLocationsAction({ label, value, code }));
          // cities.push({ label, value, code });
        }
        // dispatch(setLocationsAction(cities));
      } catch (error) {
        console.error('Location Fetch Failed', error);
      }
    })();
  }
  return next(action);
};

const getGeolocation: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === CITIES_API_GET_GEOLOCATION) {
    const latLng = action.payload;
    (async () => {
      try {
        const url = `${baseUrl}/${locationsUrl}/geoposition/search?apikey=${apiKey}&q=${latLng.latitude}, ${latLng.longitude}`;
        const res = await fetch(url);
        const geoLocation = await res.json();
        const city = {
          label: geoLocation.LocalizedName,
          value: geoLocation.Country.LocalizedName,
          code: geoLocation.Key
        }        
        dispatch(setCityAction(city));
        dispatch(addLatLngAction({ lat: latLng.latitude, lng: latLng.longitude }));
      } catch (error) {
        console.error('geoLocation Fetch Failed', error);
      }
    })();
  }
  return next(action);
};

export const citiesMiddleware = [getFiveDayForcast, getTodayForcast, getLocations, getGeolocation ];

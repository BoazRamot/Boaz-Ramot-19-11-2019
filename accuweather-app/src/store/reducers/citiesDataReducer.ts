import { SET_CITY, SET_FIVE_DAY_FORCAST_DATA_SET, SET_LOCATIONS, 
  SET_FAVORITES_DATA_SET, 
  ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SHOW_CITIES, GET_FAVORITES_DATA_SET } from "../actions/action.citiesDataReducer";

const initState: any = {
  favoriteCities: [],
  // favorites: [],
  getFavorites: false,
  city: {},
  fiveDayForcast: [],
  locations: [],
  showCities: false
};

const citiesDataReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return{
        ...state,
        favoriteCities: [...state.favoriteCities, action.payload],
        getFavorites: true,
      };

    case REMOVE_FROM_FAVORITES:
      return{
        ...state,
        favoriteCities: state.favoriteCities.filter((city: any) => city.code !== action.payload),
      };

    case SET_FAVORITES_DATA_SET:
      return {
        ...state,
        // favorites: action.payload,
        favoriteCities: action.payload,
        getFavorites: false,
      };

    case GET_FAVORITES_DATA_SET:
      return {
        ...state,
        getFavorites: true,
      };

    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };

    case SET_FIVE_DAY_FORCAST_DATA_SET:
      return {
          ...state,
          fiveDayForcast: action.payload,
      };

    case SET_LOCATIONS:
      return {
          ...state,
          locations: [...state.locations, action.payload],
      };

      case SHOW_CITIES:
      return {
        ...state,
        showCities: action.payload,
      };
   
    default:
      return state;
  }
};

export default citiesDataReducer;
  
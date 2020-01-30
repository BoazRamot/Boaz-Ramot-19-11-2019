import {
  ADD_ADDRESS,
  ADD_LAT_LNG,
  ADD_MARKER_LAT_LNG,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  RESET_ADDRESS,
  RESET_REDIRECT,
  SET_REDIRECT,
} from '../actions/action.mapReducer';

const mapInitState: any = {
  address: '',
  markerAddress: '',
  latLng: { lat: 32.0852999, lng: 34.78176759999997 },
  open: true,
  redirect: false,
  mapCentre: null,
  mapZoom: null,
  numOfMarkers: null,
  markerLatLng: {},
};

const mapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case RESET_ADDRESS:
      return {
        ...state,
        address: '',
      };
    case ADD_LAT_LNG:
      return {
        ...state,
        latLng: action.latLng,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: true,
        latLng: action.latLng,
        mapCentre: action.mapCentre,
        mapZoom: action.mapZoom,
        numOfMarkers: action.numOfMarkers,
        address: action.address,
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    case ADD_MARKER_LAT_LNG:
      return {
        ...state,
        markerLatLng: action.latLng,
      };
    default:
      return state;
  }
};

export default mapReducer;

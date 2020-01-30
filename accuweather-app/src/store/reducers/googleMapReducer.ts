import {
  ADD_MAP,
  ADD_MARKER,
  RESET_MARKER,
  RESET_STATE,
  ADD_MAPS,
} from '../actions/action.googleMapReducer';

const mapInitState: any = {
  markersMap: new Map(),
  map: null,
  maps: null
};

const googleMapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case ADD_MAP:
      return {
        ...state,
        map: action.map,
      };
    case ADD_MAPS:
      return {
        ...state,
        maps: action.map,
      };
    case ADD_MARKER:
      return {
        ...state,
        markersMap: action.marker,
      };
    case RESET_MARKER:
      return {
        ...state,
        markersMap: state.markersMap.clear(),
      };
    case RESET_STATE:
      return {
        ...state,
        map: null,
        markersMap: state.markersMap.clear(),
      };
    default:
      return state;
  }
};

export default googleMapReducer;

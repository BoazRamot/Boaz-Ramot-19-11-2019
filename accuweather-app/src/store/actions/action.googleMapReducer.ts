// action types

export const ADD_MARKER = 'ADD_MARKER';
export const RESET_MARKER = 'RESET_MARKER';
export const ADD_MAP = 'ADD_MAP';
export const ADD_MAPS = 'ADD_MAPS';
export const RESET_STATE = 'RESET_STATE';

// action creators

export const addMarkerAction = (marker: any) => {
  return { type: ADD_MARKER, marker };
};

export const resetMarkerAction = () => {
  return { type: RESET_MARKER };
};

export const addMapAction = (map: any) => {
  return { type: ADD_MAP, map };
};

export const resetStateAction = () => {
  return { type: RESET_STATE };
};

export const addMapsAction = (map: any) => {
  return { type: ADD_MAPS, map };
};

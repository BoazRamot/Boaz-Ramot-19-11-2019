// action types

export const SET_PAGE_NOT_FOUND = 'SET_PAGE_NOT_FOUND';
export const RESET_PAGE_NOT_FOUND = 'RESET_PAGE_NOT_FOUND';
export const SET_UNIT = 'SET_UNIT';

// action creators

export const setPageNotFoundAction = () => {
  return { type: SET_PAGE_NOT_FOUND };
};

export const resetPageNotFoundAction = () => {
  return { type: RESET_PAGE_NOT_FOUND };
};

export const setUnitAction = (payload: any) => {
  return { type: SET_UNIT, payload };
};

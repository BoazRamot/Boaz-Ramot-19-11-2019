import {
  RESET_PAGE_NOT_FOUND, SET_PAGE_NOT_FOUND, SET_UNIT
} from '../actions/action.userDataReducer';

const userDataInitState: any = {
  pageNotFound: false,
  isFahrenheit: true,
};

const userDataReducer = (state: any = userDataInitState, action: any) => {
  switch (action.type) {
    case SET_PAGE_NOT_FOUND:
      return {
        ...state,
        pageNotFound: true,
      };

    case RESET_PAGE_NOT_FOUND:
      return {
        ...state,
        pageNotFound: false,
      };

    case SET_UNIT:
      return {
        ...state,
        isFahrenheit: action.payload,
      };

    default:
      return state;
  }
};

export default userDataReducer;

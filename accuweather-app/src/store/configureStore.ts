import { applyMiddleware, combineReducers, createStore } from 'redux';
import { loadStateFromSessionStorage } from '../helpers/localStorage';
import userDataReducer from './reducers/userDataReducer';
import citiesDataReducer from './reducers/citiesDataReducer';
import { citiesMiddleware } from './middlewares/cities.api.middleware';
import mapReducer from './reducers/mapReducer';
import googleMapReducer from './reducers/googleMapReducer';
import { mapDataMiddleware } from './middlewares/map.data.middleware';

export default function configureStore() {
  const middleware = [...citiesMiddleware, ...mapDataMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const persistedState = loadStateFromSessionStorage() || {};

  const rootReducer = combineReducers({
    user: userDataReducer,
    cities: citiesDataReducer,
    map: mapReducer,
    googleMap: googleMapReducer,
  });

  return createStore(rootReducer, persistedState, middlewareEnhancer);
}

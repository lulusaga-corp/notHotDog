import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './src/store/auth';
import food from './src/store/food';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  auth,
  food,
  form: formReducer,
});

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;

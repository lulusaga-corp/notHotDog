import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './src/modules/auth';
import camera from './src/modules/camera';
import food from './src/modules/food';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  auth,
  camera,
  food,
  form: formReducer,
});

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;

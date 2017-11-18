import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './src/modules/auth';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  auth,
  form: formReducer,
});

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default store;

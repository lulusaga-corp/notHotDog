import firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import { reset } from 'redux-form';
import { clearFoodStore } from './food'

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const GET_API_KEYS = 'GET_API_KEYS'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_USER_FIRST_NAME = 'GET_USER_FIRST_NAME'
export const GET_USER_LAST_NAME = 'GET_USER_LAST_NAME'
export const GET_USER_FOOD_RESTRICTIONS = 'GET_USER_FOOD_RESTRICTIONS'

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const signInUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      dispatch(reset('signin'))
      return firebase.firestore().collection(`env`).get()
  })
    .then(snapshot => {
      if (snapshot){
        dispatch({type: GET_API_KEYS, payload:snapshot.data()})
      }
    })
    .catch((error) => { dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); });
};

export const signUpUser = ({ email, password, firstname, lastname }) => (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: user });
      dispatch(reset('signup'));
      return firebase.firestore().collection(`users`).doc(`${user.uid}`).set({ firstname, lastname })
    })
    .then(()=> {
      return firebase.firestore().collection(`env`).get()
    })
    .then(snapshot => {
      if (snapshot){
        dispatch({type: GET_API_KEYS, payload:snapshot.data()})
      }
    })
    .catch((error) => { dispatch({ type: SIGN_UP_FAILURE, payload: authFailMessage(error.code) }); });
};

export const clearState = () => (
  { type: SET_INITIAL_STATE }
);

export const signOutUser = () => (dispatch) => {
  dispatch({ type: SET_INITIAL_STATE });
  dispatch(clearFoodStore())
  firebase.auth().signOut();
  Actions.auth()
};

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email is invalid.';
    case 'auth/user-disabled':
      return 'User is disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/wrong-password':
      return 'Password is invalid.';
    case 'auth/email-already-in-use':
      return 'Email address is already in use.';
    case 'auth/weak-password':
      return 'Password is not strong enough.';
    default:
      return 'Authentication failed.';
  }
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */

const INITIAL_STATE = {
  error: '',
  loading: false,
  user: null,
  api: [{ apiKey:'' }, { id:'', key:'' }],
  dietary:[],
  allergies:[],
  firstname:'',
  lastname:''
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_API_KEYS:
      return {...state, api: action.payload}
    case GET_USER_PROFILE:
      return Object.assign(state, action.payload)
    case GET_USER_FOOD_RESTRICTIONS:
      return Object.assign(state, action.payload)
    case SIGN_UP_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_UP_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SIGN_IN_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SET_INITIAL_STATE:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer

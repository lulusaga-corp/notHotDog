import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import 'firebase/firestore';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */

export const GET_OPTIONS = 'GET_OPTIONS'
export const GET_ALL_USER_MEALS = 'GET_ALL_USER_MEALS'

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */

export const getAllUserMeals = userId => dispatch => {
  firebase.firestore().collection(`users/${userId}/meals`)
    .get()
    .then(snapshot => {
      let allMeals = []
      snapshot.forEach(doc => allMeals.push(doc.data()))
      dispatch({type: GET_ALL_USER_MEALS, payload: allMeals})
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  allMeals: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALL_USER_MEALS:
            return {...state, allMeals: action.payload}
        default: 
            return state;
    }
}

export default reducer;
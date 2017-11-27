import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';


/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */

export const GET_OPTIONS = 'GET_OPTIONS'
export const GET_ALL_USER_MEALS = 'GET_ALL_USER_MEALS'
// export const UPDATE_MOST_RECENT_MEAL = 'UPDATE_MOST_RECENT_MEAL'

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
      // let sortedMeals = allMeals.sort(function(a, b){
      //   return moment(b.timestamp).format('X')-moment(a.timestamp).format('X')
      // });
      //---------time filterers-----------
      const today = mealInstance => moment(mealInstance.timestamp).isSame(moment(), "day")
      const week = mealInstance => moment(mealInstance.timestamp).isAfter(moment().subtract(1, "week"), "day")
      const month = mealInstance => moment(mealInstance.timestamp).isAfter(moment().subtract(1, "month"), "day")

      const mealData = allMeals.reduce((acc, mealInstance) => {
        if (today(mealInstance)) acc.todaysMeals ? acc.todaysMeals.push(mealInstance) : acc.todaysMeals = [mealInstance]
        if (week(mealInstance)) acc.weekMeals ? acc.weekMeals.push(mealInstance) : acc.weekMeals = [mealInstance]
        if (month(mealInstance)) acc.monthMeals ? acc.monthMeals.push(mealInstance) : acc.monthMeals = [mealInstance]
        return acc
        },{})
      mealData.allMeals = allMeals
      mealData.mostRecent = [mealData.todaysMeals.reduce((acc, mealInstance) => {
        return moment(acc.timeStamp).isAfter(moment(mealInstance.timestamp)) ? acc : mealInstance
        })]
      dispatch({type: GET_ALL_USER_MEALS, payload: mealData})
    }, {})
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

// export const updateMostRecentMeal = mealInstance => {
//   const action = { type: UPDATE_MOST_RECENT_MEAL, payload: mealInstance };
//   return action;
// }

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case GET_ALL_USER_MEALS:
          return {...state, ...action.payload}
      // case UPDATE_MOST_RECENT_MEAL:
      //     return {...state, mostRecent: action.payload}
        default: 
            return state;
    }
}

export default reducer;
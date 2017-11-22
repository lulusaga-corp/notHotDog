import Clarifai from 'clarifai'
import { Actions } from 'react-native-router-flux'
const clarifai = new Clarifai.App({
            apiKey: "dd78fc13ab31417c9e61706721dc8179"
          });
process.nextTick = setImmediate;

export const GET_OPTIONS = 'GET_OPTIONS'
export const DELETE_FROM_FOODARR = 'DELETE_FROM_FOODARR'
export const ADD_TO_FOODARR = 'ADD_TO_FOODARR'

export const getOptions = data => dispatch => {
    clarifai.models
        .predict(Clarifai.FOOD_MODEL, { base64: data.base64 })
        .then(response => {
          let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
            .map(item => item.name)
          dispatch({type: GET_OPTIONS, payload: foodArr});
          Actions.FoodSelector();
        }, err => {
          console.error()
        })
}

export const deleteFromFoodArr = item => (dispatch, getState) => {
  console.log('dispatch', dispatch)
  let stateArr = getState().food.foodArr.slice()
  console.log('stateArr', stateArr)
  stateArr.splice(stateArr.indexOf(item), 1)
  dispatch({ type: DELETE_FROM_FOODARR, response : stateArr })
}

export const addToFoodArr = item => (dispatch, getState) => {
  let stateArr = getState().food.foodArr.slice()
  stateArr.push(item)
  dispatch({ type: ADD_TO_FOODARR, payload : stateArr })
}

const INITIAL_STATE = {
    foodArr: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_OPTIONS: 
            return {...state, foodArr: action.payload}
      case DELETE_FROM_FOODARR:
            return {...state, foodArr: action.payload}
      case ADD_TO_FOODARR:
            return {...state, foodArr: action.payload}
        default: 
            return state;
    }
}

export default reducer 
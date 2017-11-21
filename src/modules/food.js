import Clarifai from 'clarifai'
import { Actions } from 'react-native-router-flux'

const clarifai = new Clarifai.App({
  apiKey: "dd78fc13ab31417c9e61706721dc8179"
});
process.nextTick = setImmediate;

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const GET_OPTIONS = 'GET_OPTIONS'

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const getOptions = (data) => (dispatch) => {
  clarifai.models
    .predict(Clarifai.FOOD_MODEL, { base64: data.base64 })
    .then(response => {
      let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
        .map(item => item.name)
      dispatch({type: GET_OPTIONS, payload: foodArr});
      Actions.FoodSelector();
    }, err => {
      console.error
    })
} 

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  foodArr: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GET_OPTIONS: 
      return {...state, foodArr: action.payload}
    default: 
      return state;
  }
}

export default reducer;
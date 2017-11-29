import Clarifai from 'clarifai';
import { Actions } from 'react-native-router-flux';

const clarifai = new Clarifai.App({
  apiKey: "dd78fc13ab31417c9e61706721dc8179"
});
process.nextTick = setImmediate;

export default function clarifaiCall(base64data) {
  clarifai.models
    .predict(Clarifai.FOOD_MODEL, { base64: base64data })
    .then(response => {
      let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
        .map(item => item.name)
      Actions.FoodSelector({ foodArr });
    }, err => {
      console.error
    })
}
import Clarifai from 'clarifai';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import 'firebase/firestore';

import { restrictedFood } from '../utilities/dietaryRestrictions'


export default function clarifaiCall(base64data, foodRestrictions, allergies, clarifaiKey) {
  const clarifai = new Clarifai.App({
    apiKey: clarifaiKey
  });
  process.nextTick = setImmediate;
  clarifai.models.predict(Clarifai.FOOD_MODEL, { base64: base64data })
  .then(response => {
    const allRestricted = foodRestrictions
      .reduce((acc, restriction) => acc.concat(restrictedFood[restriction]), []).concat(allergies)
    let foodArr = response.outputs[0].data.concepts
      .filter(concept => concept.value >= 0.85).map(item => item.name)
      .filter(food=> {
        return !allRestricted.includes(food)
      })
    Actions.FoodSelector({ foodArr });
  })
    .catch(()=>{
      AlertIOS.alert('CAMERA ERROR!', 'Please check your camera and try again!')
      Actions.camera()
    })
}


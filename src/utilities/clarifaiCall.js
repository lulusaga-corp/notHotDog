import Clarifai from 'clarifai';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import 'firebase/firestore';

import { dietaryRestrictions } from '../utilities/dietaryRestrictions'


export default function clarifaiCall(base64data, foodRestrictions) {
  return firebase.firestore().doc(`env/clarifai`).get()
    .then(snapshot =>{
      const clarifaiKey = snapshot.data().apiKey
      const clarifai = new Clarifai.App({
        apiKey: clarifaiKey
      });
      process.nextTick = setImmediate;
      return clarifai.models
        .predict(Clarifai.FOOD_MODEL, { base64: base64data })

    })
    .then(response => {
      const foodRestrictions = foodRestrictions
        .reduce((acc, restriction) => acc.concat(dietaryRestrictions[restriction]), [])
        .reduce((acc, foods) => acc.concat(foods), [])
      let foodArr = response.outputs[0].data.concepts
        .filter(concept => concept.value >= 0.85).map(item => item.name)
        .filter(food=> {
          console.log(!foodRestrictions.includes(food))
          return !foodRestrictions.includes(food)
        })
      Actions.FoodSelector({ foodArr });
    })
    .catch(console.error)
}


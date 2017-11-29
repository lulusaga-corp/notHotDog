import Clarifai from 'clarifai';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import 'firebase/firestore';


export default function clarifaiCall(base64data) {
  return firebase.firestore().doc(`env/clarifai`).get()
    .then(snapshot =>{
      const clarifaiKey = snapshot.data().apiKey
      const clarifai = new Clarifai.App({
        apiKey: clarifaiKey
      });
      process.nextTick = setImmediate;
      clarifai.models
        .predict(Clarifai.FOOD_MODEL, { base64: base64data })
        .then(response => {
          let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
            .map(item => item.name)
          Actions.FoodSelector({ foodArr });
        }, err => {
          console.error
        })
    })

}
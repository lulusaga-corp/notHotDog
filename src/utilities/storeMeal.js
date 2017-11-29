import { Actions } from 'react-native-router-flux';
import fullNutrientParser from '../utilities/nutrientParser';
import firebase from 'firebase';
import 'firebase/firestore';

export default function storeMeal(data,userId) {
  let mealInstance = [];
  if (data) {
    fullNutrientParser(data)
    data.foods.forEach(food => {
      let foodItem = {};
      foodItem.food_name = food.food_name;
      foodItem.serving = food.serving_weight_grams;
      foodItem.data = {};
      foodItem.data.protein = food.nf_protein;
      foodItem.data.carbs = food.nf_total_carbohydrate;
      foodItem.data.fat = food.nf_total_fat;
      foodItem.nutrients = food.parsed_nutrients;
      foodItem.dv = food.daily_values.filter(dv => dv.percentdv).sort((a,b) => a.percentdv < b.percentdv)
      mealInstance.push(foodItem);
    });
  }
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  return firebase.firestore().collection(`users`).doc(`${userId}`).collection('meals').add({
    mealInstance,
    timestamp
  })
    .then(() => {
      const mostRecent = {mostRecent: mealInstance[0]}
      Actions.AccountHome({mealInstance})
    })
}
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default function getProductFromUPC(upc) {
  console.log('upc:', upc)
  axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, {
      headers: {
        "x-app-id": "da40e3ba",
        "x-app-key": "9039730dc95644122941bec700a3ebe4",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data)
    .then(response => {
      let foodArr = [response.foods[0].food_name]
      Actions.FoodSelector({ foodArr });
    }, err => {
      console.error
    })
}
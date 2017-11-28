import axios from 'axios';
import storeMeal from './storeMeal';

export default function getProductFromUPC(upc,userId) {
  axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, {
      headers: {
        "x-app-id": "eeab842c",
        "x-app-key": "21e0db6ffe3531c4fc579edd953ca88f",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data)
    .then(response => {
      storeMeal(response, userId)
    }, err => {
      console.error
    })
}
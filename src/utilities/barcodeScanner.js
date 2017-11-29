import React from 'react'
import axios from 'axios';
import storeMeal from './storeMeal';

export default function barcodeScanner(upc,userId) {
  axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, {
      headers: {
        "x-app-id": "da40e3ba",
        "x-app-key": "9039730dc95644122941bec700a3ebe4",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data)
    .then(response => {
      storeMeal(response, userId)
    })
    .catch(err => console.error(err))
}
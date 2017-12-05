import React from 'react'
import axios from 'axios';
import storeMeal from './storeMeal';

export default function barcodeScanner(upc, userId, nutrionix) {
  axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, {
      headers: {
        "x-app-id": nutrionix.id,
        "x-app-key": nutrionix.key,
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data)
    .then(response => {
      storeMeal(response, userId)
    })
    .catch(err => console.error(err))
}
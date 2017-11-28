import React, { Component } from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { ImagePicker } from 'expo';
import store from '../../configureStore';
import { dispatch } from 'redux';
import { getOptions } from '../modules/food';
import { Spinner } from '../components/common';
import Clarifai from 'clarifai'
const clarifai = new Clarifai.App({
  apiKey: "dd78fc13ab31417c9e61706721dc8179"
});
process.nextTick = setImmediate;
import { Actions } from 'react-native-router-flux';

export default class GalleryScreen extends React.Component {
  render() {
    ImagePicker.launchImageLibraryAsync({base64: true})
    .then(photo => {
      if (photo.cancelled) {
        this.props.onPress();
      } else {
        clarifai.models
          .predict(Clarifai.FOOD_MODEL, { base64: photo.base64 })
          .then(response => {
            let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
              .map(item => item.name)
            Actions.FoodSelector({ foodArr });
          }, err => {
            console.error
          })
      }
    })

    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  navBar: {
    backgroundColor: '#36d7b7',
    padding: 10
  },
  navTitle: {
    color: 'black'
  },
});
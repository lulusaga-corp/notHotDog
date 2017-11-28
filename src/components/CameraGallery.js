import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import { dispatch } from 'redux';
import { getOptions } from '../store/food';
import { Spinner } from './common/index';
import Clarifai from 'clarifai'
import firebase from 'firebase';
import 'firebase/firestore';
process.nextTick = setImmediate;
import { Actions } from 'react-native-router-flux';

export default class GalleryScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      clarifaiKey: "",
    }
  }

  componentWillMount(){
    firebase.firestore().doc(`env/clarifai`).get()
      .then(snapshot =>{
        const clarifaiKey = snapshot.data().apiKey
       this.setState({clarifaiKey})
      })
  }
  render() {
    const clarifai = new Clarifai.App({
      apiKey: this.state.clarifaiKey
    });
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
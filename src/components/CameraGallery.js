import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import { dispatch } from 'redux';
import { getOptions } from '../store/food';
import { Spinner } from './common/index';
import clarifaiCall from '../utilities/clarifaiCall';

export default class GalleryScreen extends React.Component {
  render() {

    ImagePicker.launchImageLibraryAsync({base64: true})
    .then(photo => {
      if (photo.cancelled) {
        this.props.onPress();
      } else {
        clarifaiCall(photo.base64, this.props.restrictions, this.props.allergies)
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
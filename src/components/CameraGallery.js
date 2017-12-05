import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';
import { Spinner } from './common/index';
import clarifaiCall from '../utilities/clarifaiCall';

const GalleryScreen = () => {
  ImagePicker.launchImageLibraryAsync({base64: true})
  .then(photo => {
    if (photo.cancelled) {
      this.props.onPress();
    } else {
      clarifaiCall(photo.base64)
    }
  })

  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  );
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

export default GalleryScreen;

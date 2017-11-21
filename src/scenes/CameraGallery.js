import React, { Component } from 'react';
import { 
  View,
  StyleSheet
} from 'react-native';
import { ImagePicker } from 'expo';
import store from '../../configureStore';
import { dispatch } from 'redux';
import { getOptions } from '../modules/food';
import { Spinner } from '../components/common'

export default class GalleryScreen extends React.Component {
  render() {
    ImagePicker.launchImageLibraryAsync({base64: true})
    .then(photo => {
      if (photo.cancelled) {
        this.props.onPress
      } else {
        store.dispatch(getOptions(photo))
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
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picture: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
  }
});
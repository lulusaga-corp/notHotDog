import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { showGallery } from '../modules/camera';
import { getOptions } from '../modules/food'

const CameraGallery = (props) => {
  const { currentPicture, retrievePictureFromCameraRoll, endShowGallery } = props;
  
  ImagePicker.launchImageLibraryAsync({base64: true})
    .then(photo => {
      if (photo.cancelled) {
        endShowGallery()
      } else {
        retrievePictureFromCameraRoll(photo)
      }
    })

  return (
    <View style={styles.container}>
      <Text>Your Picture Is Being Analyzed</Text>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrievePictureFromCameraRoll(data) {
      dispatch(getOptions(data))
    }, 
    endShowGallery() {
      dispatch(showGallery())
    }
  }
}

export default connect(mapDispatchToProps)(CameraGallery)

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
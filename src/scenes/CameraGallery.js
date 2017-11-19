import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { FileSystem, ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { retrievePicture } from '../modules/camera'

const CameraGallery = (props) => {
  const { currentPicture, retrievePictureFromCameraRoll, pictureUri } = props;
  if (!currentPicture) {
    ImagePicker.launchImageLibraryAsync({base64: true})
      .then(photo => {
        retrievePictureFromCameraRoll(photo.base64)
        {/* Right now this sends the photo to the store and then shows some placeholder text - we need to route to next page */}
      })
  }

  return (
    <View style={styles.container}>
      <Text>Your Picture Has Been Selected</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    currentPicture: state.camera.currentPicture
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrievePictureFromCameraRoll(picture) {
      dispatch(retrievePicture(picture))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraGallery)

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
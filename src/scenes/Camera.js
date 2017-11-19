import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Image,
  Picker,
  Button,
  ScrollView,
  Vibration,
} from 'react-native';
import CameraGallery from './CameraGallery';
import { connect } from 'react-redux';
import { newPicture, showGallery, toggleFacing, toggleFlash, toggleWB, toggleAutoFocus, setFocus } from '../modules/camera';

  // zoomOut() {
  //   this.setState({
  //     zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
  //   });
  // }

  // zoomIn() {
  //   this.setState({
  //     zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
  //   });
  // }

const takePicture = async function(props) {
  if (this.camera) {
    this.camera.takePictureAsync({base64: true}).then(data => {
      props.takePictureWithCamera(data.base64);
  //     FileSystem.moveAsync({
  //       from: data,
  //       to: `${FileSystem.documentDirectory}photos/Photo_${props.photoId}.jpg`,
  //     }).then((data) => {
  //       console.log('data from pic then: ', data)
  //       // this.setState({
  //       //   photoId: this.state.photoId + 1
  //       // });
  //       Vibration.vibrate();
  //     });
  //   }).catch(e => {
  //   console.log(e, 'Photo error');
    });
  }
};

const renderGallery = (props) => {
  return <CameraGallery onPress={props.toggleView} />;
}

const renderCamera = (props) => {
  const { type, flash, autoFocus, zoom, whiteBalance, depth } = props;
  const {toggleFacing, toggleFlash, toggleView, toggleWhiteBalance, toggleAutoFocus, setFocusDepth } = props;
    
  return (
    <Camera
      ref={ref => {
        this.camera = ref;
      }}
      style={{
        flex: 1,
      }}
      type={type}
      flashMode={flash}
      autoFocus={autoFocus}
      zoom={zoom}
      whiteBalance={whiteBalance}
      focusDepth={depth}>
      <View
        style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => toggleFacing(type)}>
          <Text style={styles.flipText}> FLIP </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => toggleFlash(flash)}>
          <Text style={styles.flipText}>
            {' '}FLASH: {flash}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => toggleWhiteBalance(whiteBalance)}>
          <Text style={styles.flipText}>
            {' '}WB: {whiteBalance}{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.focusView}>
        <Slider
          style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
          onValueChange={() => setFocusDepth(depth+.1)}
          value={depth}
          step={0.1}
          disabled={autoFocus === 'on'}
        />
      </View>
      <View
        style={styles.zoomView}>
        <TouchableOpacity
          style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
          onPress={props.zoomIn()}>
          <Text style={styles.flipText}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
          onPress={props.zoomOut()}>
          <Text style={styles.flipText}> - </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
          onPress={() => toggleAutoFocus(autoFocus)}>
          <Text style={styles.flipText}>
            {' '}AF : {autoFocus}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.flipButton,
            styles.picButton,
            { flex: 0.3, alignSelf: 'flex-end' },
          ]}
          onPress={() => takePicture(props)}>
          <Text style={styles.flipText}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.flipButton,
            styles.galleryButton,
            { flex: 0.25, alignSelf: 'flex-end' },
          ]}
          onPress={() => toggleView()}>
          <Text style={styles.flipText}> Gallery </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const AppCamera = (props) => {

  FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos',
      {intermediates: true}
    ).catch(e => {
      console.log(e, 'Directory exists');
    });

  return (
    <View style={styles.container}>
      {props.showGallery ? renderGallery(props) : renderCamera(props)}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    flash: state.camera.flash,
    zoom: 0,
    autoFocus: state.camera.autoFocus,
    depth: state.camera.depth,
    type: state.camera.cameraType,
    whiteBalance: state.camera.wb,
    photoId: 1,
    showGallery: state.camera.showGallery,
    currentPicture: state.camera.currentPicture
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    takePictureWithCamera (picture) {
      dispatch(newPicture(picture))
    },
    toggleView() {
      dispatch(showGallery())
    },
    toggleFacing(currentType) {
      dispatch(toggleFacing(currentType))
    },
    toggleFlash(currentFlash) {
      dispatch(toggleFlash(currentFlash))
    },
    toggleWhiteBalance(currentWB) {
      dispatch(toggleWB(currentWB))
    },
    toggleAutoFocus(currentAF) {
      dispatch(toggleAutoFocus(currentAF))
    },
    setFocusDepth(e) {
      dispatch(setFocus(e))
    },
    zoomIn() {},
    zoomOut() {},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppCamera)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  navigation: {
    flex: 1,
  },
  buttonArea: {
    flex: 0.5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  focusView: {
    flex: 0.4,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  zoomView: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  row: {
    flexDirection: 'row',
  },
});

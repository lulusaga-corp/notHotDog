import {
  Camera,
} from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Button,
} from 'react-native';
import CameraGallery from './CameraGallery';
import { Spinner } from '../components/common'
import store from '../../configureStore';
import { dispatch } from 'redux';
import { getOptions } from '../modules/food';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class AppCamera extends Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    showGallery: false,
    loading: false
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true}).then(data => {
        store.dispatch(getOptions(data))
        this.setState({loading: true})
      })
      .catch(e => {
        console.error(e, 'Photo error');;
      })
    }
  };

  renderGallery() {
    return <CameraGallery onPress={this.toggleView.bind(this)} />;
  }
    
  renderCamera() {
    const { type, flash, autoFocus, zoom,whiteBalance, depth } = this.state;
    
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
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
            onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}>
              {' '}FLASH: {flash}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}>
              {' '}WB: {whiteBalance}{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.focusView}>
          <Slider
            style={styles.focusSlider}
            onValueChange={this.setFocusDepth.bind(this)}
            value={depth}
            step={0.1}
            disabled={autoFocus === 'on'}
          />
        </View>
        <View
          style={styles.zoomView}>
          <TouchableOpacity
            style={[
              styles.flipButton, 
              styles.zoomButton
            ]}
            onPress={this.zoomIn.bind(this)}>
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton, 
              styles.zoomButton
            ]}
            onPress={this.zoomOut.bind(this)}>
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton, 
              styles.afButton
            ]}
            onPress={this.toggleFocus.bind(this)}>
            <Text style={styles.flipText}>
              {' '}AF : {autoFocus}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              styles.picButton
            ]}
            onPress={this.takePicture.bind(this)}>
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              styles.galleryButton,
            ]}
            onPress={this.toggleView.bind(this)}>
            <Text style={styles.flipText}> Gallery </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <View style={styles.container}>
        {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  camera: {
    flex: 1,
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
  focusSlider: {
    width: 150, 
    marginTop: 15, 
    alignSelf: 'flex-end'
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
    flex: 0.33,
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
  zoomButton: { 
    flex: 0.1, 
    alignSelf: 'flex-end' 
  },
  afButton: { 
    flex: 0.25, 
    alignSelf: 'flex-end' 
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
    flex: 0.3, 
    alignSelf: 'flex-end'
  },
  galleryButton: {
    backgroundColor: 'indianred',
    flex: 0.25, 
    alignSelf: 'flex-end'
  },
  row: {
    flexDirection: 'row',
  },
});

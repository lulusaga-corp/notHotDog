import { Camera } from 'expo';
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import CameraGallery from './CameraGallery';
import { Spinner } from '../components/common'
import store from '../../configureStore';
import { dispatch } from 'redux';
import { getOptions } from '../modules/food';
import { Icon } from 'react-native-elements';
import { cameraStyle as styles }  from '../assets/stylesheets';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off'
};

export default class AppCamera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flash: 'auto',
      showGallery: false,
      loading: false
    };
  }

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
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
    const { type, flash, autoFocus, zoom, whiteBalance, depth } = this.state;
    
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        flashMode={flash}>
        <View style={styles.controls}>
          <Icon
            raised
            name={`flash-${flash}`}
            size={26}
            color="gray"
            reverse
            onPress={this.toggleFlash.bind(this)} />
          <Icon
            raised
            name="camera"
            size={36}
            color="darkseagreen"
            reverse
            onPress={this.takePicture.bind(this)} />
          <Icon
            raised
            name="image"
            size={26}
            color="indianred"
            reverse
            onPress={this.toggleView.bind(this)} />
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


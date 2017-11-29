import { Camera, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react';
import Clarifai from 'clarifai'
import { Text, View } from 'react-native';
import CameraGallery from '../components/CameraGallery';
import { Spinner } from '../components/common'
import { Icon } from 'react-native-elements';

import { cameraStyle as styles }  from '../assets/stylesheets';
const clarifai = new Clarifai.App({
  apiKey: "dd78fc13ab31417c9e61706721dc8179"
});
process.nextTick = setImmediate;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off'
};

export class AppCamera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      flash: 'auto',
      showGallery: false,
      loading: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

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
        this.setState({loading: true})
        clarifai.models
          .predict(Clarifai.FOOD_MODEL, { base64: data.base64 })
          .then(response => {
            let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
              .map(item => item.name)

            Actions.FoodSelector({ foodArr });
          }, err => {
            console.error
          })
          .catch(console.log)
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
    const { flash, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
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
              color="#00a587"
              reverse
              onPress={this.toggleFlash.bind(this)} />
            <Icon
              raised
              name="camera"
              size={36}
              color="#ef4836"
              reverse
              onPress={this.takePicture.bind(this)} />
            <Icon
              raised
              name="image"
              size={26}
              color="#b5000c"
              reverse
              onPress={this.toggleView.bind(this)} />
          </View>
        </Camera>
      );
    }
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

export default AppCamera

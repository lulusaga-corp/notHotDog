import { Camera } from 'expo';
import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import Clarifai from 'clarifai'
const clarifai = new Clarifai.App({
  apiKey: "dd78fc13ab31417c9e61706721dc8179"
});
process.nextTick = setImmediate;
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import CameraGallery from './CameraGallery';
import { Spinner } from '../components/common'
import store from '../../configureStore';
import { getAllUserMeals } from '../modules/food'
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

  componentDidMount(){
    this.props.fetchAllMeals(this.props.userId)
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
        clarifai.models
          .predict(Clarifai.FOOD_MODEL, { base64: data.base64 })
          .then(response => {
            let foodArr = response.outputs[0].data.concepts.filter(concept => concept.value >= 0.85)
              .map(item => item.name)
            Actions.FoodSelector({ foodArr });
          }, err => {
            console.error
          })
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
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    margin: 5,
  },
});

const mapStateToProps = (state) => ({
  userId: state.auth.user.uid
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCamera)

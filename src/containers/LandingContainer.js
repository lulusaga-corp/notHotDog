import React, { Component } from 'react';
import {
  View,
  Button
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class LandingContainer extends Component {
  constructor(props){
      super(props)
  }
  render() {
    return (
      <View>
        <Button onPress={() => this.props.signOutUser() } title="SignOut"/>
        <Button onPress={() => {Actions.tabbar()}} title="Account" />
        <Button onPress={() => {Actions.gallery()}} title="Camera" />
      </View>
    );
  }
}

export default LandingContainer;
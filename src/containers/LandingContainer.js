import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class LandingContainer extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return <View>
            <Button onPress={console.log('button')} title="Logout" />
            <Button onPress={() => {Actions.tabbar()}} title="Account" />
            <Button onPress={console.log('button')} title="Camera" />
          </View>;
    }
}

export default LandingContainer

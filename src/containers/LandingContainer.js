import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class LandingContainer extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return <View>
            <Button onPress={console.log("button")} title="Logout" />
            <Button onPress={console.log("button")} title="Account" />
            <Button onPress={console.log("button")} title="Camera" />
          </View>;
    }
}

export default LandingContainer

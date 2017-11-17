import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Button from 'react-native-button';

import LandingContainer from '../containers/LandingContainer';

class LoggedIn extends Component {
    render () {
        return (
        <View>
        <LandingContainer />
        </View>
        )
    }
}

export default LoggedIn;
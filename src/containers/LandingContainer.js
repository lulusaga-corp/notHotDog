import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Button from 'react-native-button';

class LandingContainer extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
            <View>
                <Button>camera</Button> {/* open camera */}
                <Button>my account</Button> {/* navigate to Account Home */}
                <Button>logout</Button>
            </View>
        )
    }
}
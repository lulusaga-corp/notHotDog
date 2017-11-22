import React, { Component } from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux'
import { signOutUser } from '../modules/auth'

//import AccountSettings from '../containers/LandingContainer';

class AccountSettings extends Component {
    render () {
        return(
        <View>
            <Text>Hello from Settings</Text>
            <Button onPress={ this.props.signOutUser } title="SignOut"/>
        </View>
        )
    }
}

export default connect( ()=>({}), {signOutUser} )(AccountSettings);
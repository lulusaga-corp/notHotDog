import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import {signOutUser} from '../modules/auth'

import LandingContainer from '../containers/LandingContainer';

class LoggedIn extends Component {
    render () {
        return (
        <View>
        <LandingContainer signOutUser={this.props.signOutUser}/>
        </View>
        )
    }
}
const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signOutUser })(LoggedIn);

import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux'
import { signOutUser } from '../../modules/auth'
import firebase from 'firebase';

class AccountManagement extends Component {
  deleteAccount () {
    /* Promps the user to re-enter their password so that they can be signed back in (firebase requirement) */
    AlertIOS.prompt(
      'Confirm Delete',
      'Enter your password to delete your account',
      (pass) => {
        firebase.auth().signInWithEmailAndPassword(this.props.email, pass)
        .then((user) => {
          return user.delete()
        })
        .then(this.props.signOutUser)
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            AlertIOS.alert(
              'Incorrect Password',
              null,
            )
          } else {
            AlertIOS.alert(
              'Unknown error',
              null
            )
          }
        })
      },
      'secure-text'
    )
  }

  render() {
    return (
      <View>
        <Text>Are you sure you want to delete your account? This action cannot be undone.</Text>
        <Button onPress={ this.deleteAccount.bind(this) } title="Delete My Account"/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      email: state.auth.user.email
    }
  } else {
    return {
      email: ''
    }
  }
}

export default connect( mapStateToProps, {signOutUser} )(AccountManagement);
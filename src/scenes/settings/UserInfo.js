import React, { Component } from 'react';
import { Button, View, AlertIOS } from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput } from 'react-native-elements'
import firebase from 'firebase';

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      uid: this.props.uid,
      firstName: this.props.firstname || '',
      lastName: this.props.lastname || '',
      email: this.props.email || '',
      currentPass: '',
      newPass: ''
    }
  }

  editFirstName(text){
    this.setState({firstName: text})
  }
  
  editLastName(text){
    this.setState({lastName: text})
  }

  editEmail(text){
    this.setState({user: {...this.state.user, email: text}})
  }

  editCurrentPass(text){
    this.setState({currentPass: text})
  }

  setNewPass(text){
    this.setState({newPass: text})
  }

  editAccount(){
    let updatedInfo = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
    }
    let user = firebase.auth().currentUser
    user.updateProfile({ displayName: `${updatedInfo.displayName}` })
    .then(() => {
      return user.updateEmail(`${updatedInfo.email}`)
    })
    .then(() => {
      if (this.state.newPass && this.state.currentPass) {
        firebase.auth().signInWithEmailAndPassword(this.state.user.email, this.state.currentPass)
        .then((user) => user.updatePassword(this.state.newPass))
        .catch(err => AlertIOS.alert('Password Error', null))
      } else if (this.state.newPass) {
        AlertIOS.alert('Password Required', 'Please return to previous page and enter your current password')
      }
    })
      .catch(err => console.error(err))
    this.setState({ user: {...this.state.user, displayName: `${updatedInfo.displayName}`}})
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set({ firstname: updatedInfo.displayName, lastname: updatedInfo.lastName }, { merge: true })
    Actions.popTo('settings', { userFirstName: updatedInfo.displayName });
  }

  render () {
    let user = this.state.user;
    return (
      <View>
        <View>
            <View>
              <View>
                <FormLabel>First Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editFirstName(text)} 
                  defaultValue={ this.state.firstName ? this.state.firstName : null} />
                <FormLabel>Last Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editLastName(text)} 
                  defaultValue={(this.state.lastName) ? this.state.lastName : null} />
                <FormLabel>Email:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editEmail(text)} 
                  defaultValue={this.state.email} />
                <FormLabel>Current Password:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editCurrentPass(text)} 
                  defaultValue={'*'.repeat(this.state.currentPass.length)} />
                <FormLabel>New Password:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.setNewPass(text)} 
                  defaultValue={'*'.repeat(this.state.newPass.length)} />
              </View>
              <Button onPress={this.editAccount.bind(this)} title="Save Account Changes"/>
            </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  email: state.auth.user.email
})

export default connect( mapStateToProps )(UserInfo);
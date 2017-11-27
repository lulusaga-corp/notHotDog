import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux'
import { FormLabel, FormInput } from 'react-native-elements'
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class UserInfo extends Component {
  state = {
    user: this.props.user,
    uid: this.props.uid,
    name: this.props.user.displayName,
    editAccount: false,
    currentPass: '',
    newPass: ''
  }

  componentDidMount(){
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).get()
    .then(res => res.data())
    .then(data => {
      if (data.firstname) {
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname
        })
      }
    })
  }

  editName(text){
    this.setState({name: text})
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
      displayName: this.state.name,
      email: this.state.user.email
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
    this.setState({editAccount: !this.state.editAccount, user: {...this.state.user, displayName: `${updatedInfo.displayName}`}})
    Actions.pop();
  }

  render () {
    let user = this.state.user;
    return (
      <View>
        <View>
            <View>
              <View>
                <FormLabel>Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editName(text)} 
                  defaultValue={(this.state.name) ? this.state.name : user.displayName} />
                <FormLabel>Email:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editEmail(text)} 
                  defaultValue={user.email} />
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

const mapStateToProps = state => {
  if (state.auth.user) {
    return {
      user: state.auth.user.providerData[0],
      uid: state.auth.user.uid
    }
  } else {
    return {
      user: {}
    }
  }
}

export default connect( mapStateToProps )(UserInfo);
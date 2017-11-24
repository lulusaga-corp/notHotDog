import React, { Component } from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import { signOutUser } from '../modules/auth'
import { CheckBox, List, ListItem, FormLabel, FormInput } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import {Actions} from 'react-native-router-flux';

class AccountSettings extends Component {
  state = {
    user: this.props.user,
    uid: this.props.uid,
    firstname: this.props.user.displayName,
    lastname: '',
    diet: {
      vegan: false,
      vegetarian: false,
      gf: false
    },
    allergies: [],
    newAllergy: '',
    editAccount: false,
    editDiet: false
  }

  componentDidMount(){
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).get()
    .then(res => res.data())
    .then(data => {
      this.setState({
        diet: data.dietary.specialDiet || this.state.diet,
        allergies: data.dietary.allergies || this.state.allergies,
        firstname: data.name.firstname || this.state.firstname,
        lastname: data.name.lastname || this.state.lastname
      })
    })
  }

  addVegan(){
    this.setState({diet: {...this.state.diet, vegan: !this.state.diet.vegan}})
  }

  addVegetarian(){
    this.setState({diet: {...this.state.diet, vegetarian: !this.state.diet.vegetarian}})
  }

  addgf(){
    this.setState({diet: {...this.state.diet, gf: !this.state.diet.gf}})
  }

  allergyInput(text) {
    this.setState({newAllergy: text})
  }

  addAllergy(){
    let newAllergy = this.state.newAllergy
    this.setState({allergies: [...this.state.allergies, newAllergy], newAllergy: ''})
  }

  removeAllergy(item) {
    this.setState({
      allergies: [...this.state.allergies.filter(allergy => allergy !== item)]
    })
  }

  editFirstName(text){
    this.setState({user: {...this.state.user, displayName: text}, firstname: text})
  }

  editLastName(text){
    this.setState({ lastname: text })
  }

  editEmail(text){
    this.setState({user: {...this.state.user, email: text}})
  }

  editAccount(){
    let updatedInfo = {
      displayName: this.state.user.displayName,
      email: this.state.user.email,
    }
    if (this.state.editAccount) {
      let user = firebase.auth().currentUser
      user.updateProfile({ displayName: `${updatedInfo.displayName}` })
      .then(() => {
        return user.updateEmail(`${updatedInfo.email}`)
      })
      .catch(err => console.error(err))
    }
    this.setState({editAccount: !this.state.editAccount})
  }

  editDiet(){
    let data = {
      dietary: {
        specialDiet: this.state.diet,
        allergies: this.state.allergies
      },
      name: {
        firstname: this.state.firstname,
        lastname: this.state.lastname
      }
    }
    if (this.state.editDiet) {
      firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set(data)
      .catch(err => console.error(err))
    }
    this.setState({editDiet: !this.state.editDiet})
  }

  deleteAccount(){
    let user = firebase.auth().currentUser
    user.delete()
    .then(() => {
      return this.props.signOutUser()
    })
    .then(() => Actions.signup())
    .catch(err => console.error(err))
  }

  render () {
    let user = this.state.user;
    let specialDiets = {
      vegan: 'Vegan',
      vegetarian: 'Vegetarian',
      gf: 'Gluten Free'
    }
    let diet = Object.keys(this.state.diet).filter(key => this.state.diet[key] === true).map(diet => specialDiets[diet]);
    return(
      <View>
        <View>
          <Text>Account Information:</Text>
          { this.state.editAccount ?
            <View>
              <View>
                <FormLabel>First Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editFirstName(text)} 
                  defaultValue={(this.state.firstname) ? this.state.firstname : user.displayName} />
                <FormLabel>Last Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editLastName(text)} 
                  defaultValue={(this.state.lastname) ? this.state.lastname : null} />
                <FormLabel>Email:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editEmail(text)} 
                  defaultValue={user.email} />
              </View>
              <Button onPress={this.editAccount.bind(this)} title="Save Account Changes"/>
            </View>
          :
            <View>
              <View>
                <Text>Name: {this.state.firstname || user.displayName || null} {this.state.lastname || null} </Text>
                <Text>Email: {user.email} </Text>
              </View>
              <Button onPress={this.editAccount.bind(this)} title="Edit Account Info"/>
            </View>
          }
        </View>
        <View>
        { this.state.editDiet ?
          <View>
            <View>
              <Text>Dietary Preferences: (Check All That Apply)</Text>
              <CheckBox
                title='Vegan'
                checked={this.state.diet.vegan}
                onPress={this.addVegan.bind(this)}
              />
              <CheckBox
                title='Vegetarian'
                checked={this.state.diet.vegetarian}
                onPress={this.addVegetarian.bind(this)}
              />
              <CheckBox
                title='Gluten Free'
                checked={this.state.diet.gf}
                onPress={this.addgf.bind(this)}
              />
            </View>
              <ScrollView>
                <Text>Allergies:</Text>
                <List>
                  {
                  this.state.allergies && this.state.allergies.map((allergy, i) => {
                    return (
                      <ListItem 
                        key={i} title={allergy} 
                        rightIcon={{name: 'clear'}}
                        onPressRightIcon={() => this.removeAllergy(allergy)}
                      />
                      )
                    })
                  }
                  <ListItem
                    textInput={true}
                    textInputValue={this.state.newAllergy}
                    textInputOnChangeText={(text) => this.allergyInput(text)}
                    textInputPlaceholder={'Add an allergy ...'}
                    rightIcon={{ name: 'add'}}
                    textInputAutoCorrect={true}
                    textInputAutoCapitalize={"none"}
                    onPressRightIcon={() => this.addAllergy(this.state.newAllergy)} />
                </List>
              </ScrollView>
              <Button onPress={this.editDiet.bind(this)} title="Save Special Diet Changes"/>
            </View>
            :
            <View>
              { diet.length > 0 && 
                <View>
                  <Text>Special Diet:</Text>
                  {diet.map((diet, i) => {
                    return (
                      <Text key={i}>{diet} </Text>
                      )
                    })
                  }
                </View>
              }
              {
                this.state.allergies.length > 0 && <View>
                  <Text>Allergies</Text>
                  {
                    this.state.allergies.map((allergy, i) => {
                    return (
                      <Text key={i}> {allergy} </Text>
                      )
                    })
                  }
                </View>
              }
              <Button onPress={this.editDiet.bind(this)} title="Edit Special Diet Info"/>
            </View>
          }
        </View>
        <View>
          <Button onPress={ this.props.signOutUser } title="SignOut"/>
          <Button onPress={ this.deleteAccount.bind(this) } title="Delete My Account"/>
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

export default connect( mapStateToProps, {signOutUser} )(AccountSettings);
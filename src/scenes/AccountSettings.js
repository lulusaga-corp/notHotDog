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

class AccountSettings extends Component {
  state = {
    user: this.props.user,
    diet: {
      vegan: false,
      vegetarian: false,
      gf: false
    },
    allergies: [],
    newAllergy: '',
    editAccount: false
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

  editName(text){
    this.setState({user: {...this.state.user, displayName: text}})
  }

  editEmail(text){
    this.setState({user: {...this.state.user, email: text}})
  }

  editAccount(){
    this.setState({editAccount: !this.state.editAccount})
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
          {
            this.state.editAccount ?
              <View>
                <View>
                  <FormLabel>Name:</FormLabel>
                  <FormInput onChangeText={(text) => this.editName(text)} defaultValue={user.displayName} />
                  <FormLabel>Email:</FormLabel>
                  <FormInput onChangeText={(text) => this.editEmail(text)} defaultValue={user.email} />
                </View>
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
                <Button onPress={this.editAccount.bind(this)} title="Save Account Changes"/>
              </View>
            :
              <View>
                <View>
                  <Text>Name: {user.displayName || null} </Text>
                  <Text>Email: {user.email} </Text>
                </View>
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
                <Button onPress={this.editAccount.bind(this)} title="Edit Account Info"/>
              </View>
          }
        </View>
        <View>
          <Button onPress={ this.props.signOutUser } title="SignOut"/>
        </View>
      </View>
    )
  }
}

export default connect( (state)=>({user: state.auth.user.providerData[0]}), {signOutUser} )(AccountSettings);
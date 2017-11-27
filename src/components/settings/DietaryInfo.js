import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class DietaryInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
    diet: {
      vegan: false,
      vegetarian: false,
      gf: false
    },
    allergies: [],
    newAllergy: '',
    uid: props.uid
    }
  }

  /* Load dietary data from Firestore */
  componentDidMount(){
    console.log('diet uid', this.state.uid)
    console.log('diet props', this.props)
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).get()
    .then(res => res.data())
    .then(data => {
      console.log('line 36')
      if (data.dietary) {
        this.setState({
          diet: data.dietary.specialDiet || this.state.diet,
          allergies: data.dietary.allergies || this.state.allergies,
        })
      }
    })
  }

  componentWillUnmount(){
    this.setState({
      diet: {
        vegan: false,
        vegetarian: false,
        gf: false
      },
      allergies: [],
      newAllergy: ''
    })
  }

  /* Set SpecialDiets */
  addVegan(){
    this.setState({diet: {...this.state.diet, vegan: !this.state.diet.vegan}})
  }

  addVegetarian(){
    this.setState({diet: {...this.state.diet, vegetarian: !this.state.diet.vegetarian}})
  }

  addgf(){
    this.setState({diet: {...this.state.diet, gf: !this.state.diet.gf}})
  }

  /* Add/Remove Allergies */
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

  /* Send Dietary data to Firestore */
  editDiet(){
    let data = {
      dietary: {
        specialDiet: this.state.diet,
        allergies: this.state.allergies
      }
    }
    
      firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set(data)
      .catch(err => console.error(err))
    Actions.pop()
  }

  render () {
    let user = this.state.user;
    let specialDiets = {
      vegan: 'Vegan',
      vegetarian: 'Vegetarian',
      gf: 'Gluten Free'
    }
    let diet = Object.keys(this.state.diet).filter(key => this.state.diet[key] === true).map(diet => specialDiets[diet]);
    console.log('diet rebder uid', this.state.uid)
    let fuser = firebase.auth().currentUser;
    console.log('diet user', fuser)
    return (
      <View>
          <View>
            <View>
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
              <Text>Check All That Apply</Text>
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
            <Button onPress={this.editDiet.bind(this)} title="Save Dietary Preferences"/>
      </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state diet', state)
  if (state.auth.user){
    
    return {
      uid: state.auth.user.uid
    }
  } else {
    return {
      uid: 'NO USER'
    }
  }
  
}


export default connect(mapStateToProps)(DietaryInfo);

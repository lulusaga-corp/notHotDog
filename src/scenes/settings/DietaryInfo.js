import React, { Component } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

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
      uid: this.props.uid
    }
  }

  /* Load dietary data from Firestore */
  componentDidMount(){
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).get()
    .then(res => res.data())
    .then(data => {
      if (data.dietary) {
        this.setState({
          diet: data.dietary.specialDiet || this.state.diet,
          allergies: data.dietary.allergies || this.state.allergies,
        })
      }
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
      firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set(data, { merge: true })
      .catch(err => console.error(err))
    Actions.pop();
  }

  render () {
    let user = this.state.user;
    let specialDiets = {
      vegan: 'Vegan',
      vegetarian: 'Vegetarian',
      gf: 'Gluten Free'
    }
    let diet = Object.keys(this.state.diet).filter(key => this.state.diet[key] === true).map(diet => specialDiets[diet]);
    return (
      <View>
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
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.user.uid
  }
}

export default connect(mapStateToProps)(DietaryInfo);

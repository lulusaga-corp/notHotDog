import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { CheckBox, List, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import store from '../../../configureStore';
import { GET_USER_PROFILE } from '../../store/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



class DietaryInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      diet: {
        vegan: false,
        vegetarian: false,
        pescatarian:false,
        gluten: false,
        peanut:false,
        shellfish: false,
        treeNut: false,
        dairy: false,
        pork: false,
        redMeat: false
      },
      allergies: this.props.allergies,
      newAllergy: '',
      uid: this.props.uid
    }
    this.editPreference = this.editPreference.bind(this)
  }

  componentDidMount(){
    console.log(this.props)
    const newState = {...this.state}
    this.props.restrictions.forEach(restriction => newState.diet[`${restriction}`] = true)
    console.log("newstate:", newState)
    this.setState(newState)
  }
  /* Set SpecialDiets */
  editPreference(preference){
    if (!preference) return;
    const newState = {...this.state}
    newState.diet[preference] = !this.state.diet[preference]
    this.setState(newState)
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
  sendDiet(){
    let data = {
      dietary: Object.keys(this.state.diet)
          .filter(specialDiet => !!this.state.diet[specialDiet]),
      allergies: this.state.allergies
    }
    console.log("DATA", data)
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set(data, { merge: true })
      .then(()=>{
        store.dispatch({type:GET_USER_PROFILE, payload: data})
        Actions.pop();
      })
      .catch(err => console.error(err))

  }

  render () {

    return (
      <View>
        <ScrollView>
          <KeyboardAwareScrollView>
          <View>
            <Text style={styles.textStyle}>Dietary Preferences: </Text>
            <View style={styles.boxStyle}>
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Vegan'
                checked={this.state.diet.vegan}
                onPress={()=>this.editPreference("vegan")}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Vegetarian'
                checked={this.state.diet.vegetarian}
                onPress={()=>this.editPreference('vegetarian')}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Pescatarian'
                checked={this.state.diet.pescatarian}
                onPress={()=>this.editPreference('pescatarian')}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Gluten Free'
                checked={this.state.diet.gluten}
                onPress={()=>this.editPreference('gluten')}
              />
            </View>
              <Text style={styles.textStyle}>Allergies and Other Avoidances:</Text>
              <View style={styles.boxStyle}>
              <CheckBox
                title='Peanut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.peanut}
                onPress={()=>this.editPreference('peanut')}
              />
              <CheckBox
                title='Shellfish'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.shellfish}
                onPress={()=>this.editPreference('shellfish')}
              />
              <CheckBox
                title='Tree Nut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.treeNut}
                onPress={()=>this.editPreference('treeNut')}
              />
              <CheckBox
                title='Lactose'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.dairy}
                onPress={()=>this.editPreference('dairy')}
              />
              <CheckBox
                title='Pork'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.pork}
                onPress={()=>this.editPreference('pork')}
              />
              <CheckBox
                title='Red Meat'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.redMeat}
                onPress={()=>this.editPreference('redMeat')}
              />
              </View>
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
                  onPressRightIcon={() =>{
                    if (this.state.newAllergy.length) this.addAllergy(this.state.newAllergy)
                  }} />
              </List>
            <Button style={styles.save} onPress={this.sendDiet.bind(this)} title="Save Special Diet Changes"/>
          </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  containerStyle: {
    width: 160
  },
  textStyle: {
    fontSize: 19,
    fontWeight: 'bold',
    padding: 10
  },
  save: {
    marginTop: 5,
    backgroundColor: '#ef4836',
    borderRadius: 5
  }
})

const mapStateToProps = state => ({
  uid: state.auth.user.uid,
  restrictions: state.auth.dietary,
  allergies: state.auth.allergies
})

export default connect(mapStateToProps)(DietaryInfo);

import React, { Component } from 'react';
import { Button, Text, View, ScrollView, StyleSheet } from 'react-native';
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
        pescatarian:false,
        gf: false,
        peanutAllergy:false,
        shellfishAllergy: false,
        treeNutAllergy: false,
        noLactose: false,
        noPork: false,
        noRedMeat: false
      },
      restricted: [],
      allergies: [],
      newAllergy: '',
      uid: this.props.uid
    }
    this.editPreference = this.editPreference.bind(this)
  }

  /* Load dietary data from Firestore */
  componentDidMount(){
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).get()
    .then(res => res.data())
    .then(data => {
      if (data.dietary) {
        const userDiet = data.dietary.reduce((acc, restriction)=> acc[restriction] = true, {})
        this.setState({...this.state, userDiet})
      }
    })
  }

  /* Set SpecialDiets */
  editPreference(preference){
    console.log("PREFFERANCE", preference)
    const newState = {...this.state}
    newState.diet[preference] = !this.state.diet[preference]
    console.log(newState)
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
    let data =
      { dietary: [...Object.key(this.state.diet), this.state.allergies] }
    firebase.firestore().collection(`users`).doc(`${this.state.uid}`).set(data, { merge: true })
      .catch(err => console.error(err))
    Actions.pop();
  }

  render () {
    let user = this.state.user;
    let specialDiets = {
      vegan: 'Vegan',
      vegetarian: 'Vegetarian',
      pescatarian: 'Pescatarian',
      gf: 'Gluten Free'
    }
    let diet = Object.keys(this.state.diet).filter(key => this.state.diet[key] === true).map(diet => specialDiets[diet]);
    console.log(this.state)

    return (
      <View>
        <ScrollView>
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
                checked={this.state.diet.gf}
                onPress={()=>this.editPreference('gf')}
              />
            </View>
              <Text style={styles.textStyle}>Allergies and Other Avoidances:</Text>
              <View style={styles.boxStyle}>
              <CheckBox
                title='Peanut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.peanutAllergy}
                onPress={()=>this.editPreference('peanutAllergy')}
              />
              <CheckBox
                title='Shellfish'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.shellfishAllergy}
                onPress={()=>this.editPreference('shellfishAllergy')}
              />
              <CheckBox
                title='Tree Nut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.treeNutAllergy}
                onPress={()=>this.editPreference('treeNutAllergy')}
              />
              <CheckBox
                title='Lactose'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.noLactose}
                onPress={()=>this.editPreference('noLactose')}
              />
              <CheckBox
                title='Pork'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.noPork}
                onPress={()=>this.editPreference('noPork')}
              />
              <CheckBox
                title='Red Meat'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.noReadMeat}
                onPress={()=>this.editPreference('noReadMeat')}
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
                  onPressRightIcon={() => this.addAllergy(this.state.newAllergy)} />
              </List>
            <Button onPress={this.sendDiet.bind(this)} title="Save Special Diet Changes"/>
          </View>
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
  }
})

const mapStateToProps = (state) => {
  return {
    uid: state.auth.user.uid
  }
}

export default connect(mapStateToProps)(DietaryInfo);

import React, { Component } from 'react';
import { Button, Text, View, ScrollView, StyleSheet } from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container } from '../../components/common/Container'

class DietaryInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      diet: {
        vegan: false,
        vegetarian: false,
        gf: false
      },
      restricted: [],
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
          restricted: data.dietary.restricted || this.state.restricted,
        })
      }
    })
  }

  /* Set SpecialDiets */
  addVegan(){
    const restricted = this.state.restricted.concat('vegan')
    this.setState({ restricted })
  }

  addVegetarian(){
    const restricted = this.state.restricted.concat('vegetarian')
    this.setState({ restricted })
  }
  addPescatarian(){
    const restricted = this.state.restricted.concat('pescatarian')
    this.setState({ restricted })
  }

  addgf(){
    const restricted = this.state.restricted.concat('gf')
    this.setState({ restricted })
  }

  addPeanutAllergy(){
    const restricted = this.state.restricted.concat('peanut')
    this.setState({ restricted })
  }

  addShellfishAllergy(){
    const restricted = this.state.restricted.concat('shellfish')
    this.setState({ restricted })
  }

  addTreenutAllergy(){
    const restricted = this.state.restricted.concat('treeNut')
    this.setState({ restricted })
  }

  addNoPork(){
    const restricted = this.state.restricted.concat('pork')
    this.setState({ restricted })
  }

  addNoRedMeat(){
    const restricted = this.state.restricted.concat('redMeat')
    this.setState({ restricted })
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
      restricted: [...this.state.restricted.filter(allergy => allergy !== item)]
    })
  }

  /* Send Dietary data to Firestore */
  editDiet(){
    let restricted = this.state.restricted
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
                onPress={this.addVegan.bind(this)}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Vegetarian'
                checked={this.state.diet.vegetarian}
                onPress={this.addVegetarian.bind(this)}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Pescatarian'
                checked={this.state.diet.gf}
                onPress={this.addPescatarian.bind(this)}
              />
              <CheckBox
                containerStyle={styles.containerStyle}
                title='Gluten Free'
                checked={this.state.diet.gf}
                onPress={this.addgf.bind(this)}
              />
            </View>
              <Text style={styles.textStyle}>Allergies and Other Avoidances:</Text>
              <View style={styles.boxStyle}>
              <CheckBox
                title='Peanut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addPeanutAllergy.bind(this)}
              />
              <CheckBox
                title='Shellfish'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addShellfishAllergy.bind(this)}
              />
              <CheckBox
                title='Tree Nut'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addTreenutAllergy.bind(this)}
              />
              <CheckBox
                title='Lactose'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addTreenutAllergy.bind(this)}
              />
              <CheckBox
                title='Pork'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addNoPork.bind(this)}
              />
              <CheckBox
                title='Red Meat'
                containerStyle={styles.containerStyle}
                checked={this.state.diet.gf}
                onPress={this.addNoRedMeat.bind(this)}
              />
              </View>
              <List>
                {
                this.state.restricted && this.state.restricted.map((allergy, i) => {
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
            <Button onPress={this.editDiet.bind(this)} title="Save Special Diet Changes"/>
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

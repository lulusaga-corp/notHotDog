import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { List, ListItem, CheckBox } from 'react-native-elements';
import { getAllUserMeals } from '../store/food'
import storeMeal from '../utilities/storeMeal';

class FoodSelector extends Component {
  constructor (props) {
    super(props);
    this.state = {
      foodArr: props.foodArr,
      foodInput: '',
      error: '',
      checked: {},
      xAppId: "",
      xAppKey: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    return firebase.firestore().doc(`env/nutrionix`)
      .get()
      .then(snapshot =>{
        const nutrionix = snapshot.data()
        this.setState({ xAppId: nutrionix.id, xAppKey: nutrionix.key})
      })
    }

  addToFoodArr = item => {
    let newStateArr = this.state.foodArr.slice()
    newStateArr.push(item)
    let newChecked = {...this.state.checked}
    newChecked[item] = true;
    this.setState({foodArr: newStateArr, foodInput: '', error: false, checked: {}})
  }

  toggleChecked = item => {
    let newChecked = {...this.state.checked}
    newChecked[item] = !newChecked[item];
    this.setState({checked: newChecked})
  }

  handleSubmit (userId) {
    if (!userId) return;
    let selected = [];
    for (food in this.state.checked) {
      if (this.state.checked[food]) {
        selected.push(food)
      }
    }
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query: selected.join(", ")
    }, {
      headers: {
        "x-app-id": this.state.xAppId,
        "x-app-key": this.state.xAppKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.data)
      .then(data => {
        storeMeal(data, userId)
      })
      .catch(()=>this.setState({error: true}))
  }

  render () {
    const {userId} = this.props
    const {foodArr} = this.state

    return (
      <View style={styles.tabContainer}>
        <ScrollView>
          <List>
          <Text style={styles.title}>Select The Foods You Are Going To Eat:</Text>
            {
              foodArr && foodArr.map((item, i) => {
                return ( 
                  <CheckBox
                    key={i}
                    center 
                    title={item}
                    iconRight
                    iconType='material'
                    checkedIcon='check'
                    uncheckedIcon='add'
                    uncheckedColor={'#fafafa'}
                    checkedColor={'#00a587'}
                    containerStyle={this.state.checked[item] && styles.checkedbox}
                    textStyle={this.state.checked[item] && styles.checkedText}
                    checked={this.state.checked[item] || false}
                    onPress={() => this.toggleChecked(item)}
                  />
                )
              })
            }
            <ListItem
              textInput={true}
              textInputValue={this.state.foodInput}
              textInputOnChangeText={(text) => {
                this.setState({foodInput: text})
              }}
              textInputPlaceholder={'Add other foods...'}
              rightIcon={{name: 'add'}}
              textInputAutoCorrect={true}
              textInputAutoCapitalize={"none"}
              onPressRightIcon={() => this.addToFoodArr(this.state.foodInput)}/>
            <ListItem
              onPress={() =>{
                this.handleSubmit(userId)
              }}
              containerStyle={styles.checkedbox}
              titleStyle={styles.checkedText}
              title="Click here to submit!"
              hideChevron={true}
            />
          </List>
          {
            this.state.error ? <Text style={styles.error}>We could not find one of the foods you entered in our database as it was typed. Please try again!</Text> : null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  checkedbox: {
    backgroundColor: "#00a587",
  },
  checkedText: {
    color: "white",
    textAlign: 'center'
  },
  error: {
    color: "#b5000c"
  }
});

const mapStateToProps = state => ({
  userId: state.auth && state.auth.user  ? state.auth.user.uid : ''
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodSelector);
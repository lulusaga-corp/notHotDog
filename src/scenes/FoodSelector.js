<<<<<<< HEAD
import React, { Component } from "react";
import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { List, ListItem, Button } from "react-native-elements";

class FoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: this.props.response,
      foodInput: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: this.state.response.join(", ")
        },
        {
          headers: {
            "x-app-id": "da40e3ba",
            "x-app-key": "9039730dc95644122941bec700a3ebe4",
            "Content-Type": "application/json"
          }
=======
import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Button } from 'react-native-elements';
import { deleteFromFoodArr, addToFoodArr } from '../modules/food'


class FoodSelector extends Component {
    constructor (props){
        super(props);
        this.state = {
          foodInput:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
      if (nextProps) this.state.foodInput = ''
    }

    handleSubmit(userId) {
      axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        query: this.props.foodArr.join(", ")
      }, {
        headers: {
          "x-app-id": "da40e3ba",
          "x-app-key": "9039730dc95644122941bec700a3ebe4",
          "Content-Type": "application/json"
>>>>>>> master
        }
      )
      .then(res => res.data)
      .then(data => {
<<<<<<< HEAD
        let keys = Object.keys(data.foods[0]).slice(0, 17);
        return data.foods.map(food => {
          return keys.reduce((acc, cur) => {
            acc[cur] = food[cur];
            return acc;
          }, {});
        });
      })
      .then(parsed => Actions.AccountHome({parsed}))
  }
=======
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        console.log('timestamp', timestamp)
        return firebase.firestore().collection(`users`).doc(`${userId}`).collection('meals').add({data,timestamp })
      })
        .then(meal=>{
          console.log('meal',meal)
        })
      .then(()=>Actions.AccountHome(data))
    }

    render () {
      const { foodArr, userId, deleteFromFoodArr, addToFoodArr } = this.props
      console.log('foodArr',foodArr)
        return(
            <View style={styles.tabContainer}>
              <ScrollView>
                <List>
                    {
                    foodArr && foodArr.map((item, i) => {
                      return <ListItem
                        key={i} title={item}
                        rightIcon={{name: 'clear'}}
                        onPressRightIcon={ ()=>{
                          console.log("item", item)
                          return deleteFromFoodArr(item)
                        } } />
                    })
                    }
                    <ListItem
                      textInput={true}
                      textInputValue={this.state.foodInput}
                      textInputOnChangeText={(text)=>{
                        this.setState({foodInput:text})
                      }}
                      textInputPlaceholder={'Add other foods...'}
                      rightIcon={{ name: 'add'}}
                      textInputAutoCorrect={true}
                      textInputAutoCapitalize={"none"}
                      onPressRightIcon={()=>addToFoodArr(this.state.foodInput)} />
                    <ListItem
                      onPress={()=>this.handleSubmit(userId)}
                      title="Click here to submit!"
                      hideChevron={true} 
                      />
>>>>>>> master

  render() {
    console.log("state", this.state);
    const filtered = this.state.response;
    return (
      <View style={styles.tabContainer}>
        <ScrollView>
          <List>
            {filtered &&
              filtered.map((item, i) => {
                return (
                  <ListItem
                    key={i}
                    title={item}
                    rightIcon={{ name: "clear" }}
                    onPressRightIcon={item => {
                      let stateArr = this.state.response.slice();
                      stateArr.splice(i, 1);
                      this.setState({ response: stateArr });
                    }}
                  />
                );
              })}
            <ListItem
              textInput={true}
              textInputValue={this.state.foodInput}
              textInputOnChangeText={text => {
                this.setState({ foodInput: text });
              }}
              textInputPlaceholder={"Add other foods..."}
              rightIcon={{ name: "add" }}
              textInputAutoCorrect={true}
              textInputAutoCapitalize={"none"}
              onPressRightIcon={() => {
                let stateArr = this.state.response.slice();
                stateArr.push(this.state.foodInput);
                this.setState({ response: stateArr });
                this.setState({ foodInput: "" });
              }}
            />
            <ListItem
              onPress={this.handleSubmit}
              title="Click here to submit!"
              hideChevron={true}
            />
          </List>
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
  }
});

<<<<<<< HEAD
const mapStateToProps = state => ({
  response: state.food.foodArr
});

export default connect(mapStateToProps)(FoodSelector);
=======
const mapStateToProps = (state) => ({
  foodArr: state.food.foodArr,
  userId: state.auth.user.uid
});

const mapDispatchToProps = (dispatch) =>
  ({
    deleteFromFoodArr(item){ dispatch(deleteFromFoodArr(item)) },
    addToFoodArr(item){ dispatch(addToFoodArr(item)) }
  })

export default connect(mapStateToProps, mapDispatchToProps)(FoodSelector);
>>>>>>> master

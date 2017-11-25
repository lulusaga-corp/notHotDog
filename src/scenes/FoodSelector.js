import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Button } from 'react-native-elements';
import { deleteFromFoodArr, addToFoodArr } from '../modules/food';
import fullNutrientParser from '../utilities/nutrientParser';


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
        }
      })
        .then(res => res.data)
        .then(data => {
          fullNutrientParser(data);
          const timestamp = firebase.firestore.FieldValue.serverTimestamp()
          firebase.firestore().collection(`users`).doc(`${userId}`).collection('meals').add({data, timestamp})
          Actions.AccountHome(data)
        })
    }

    render () {
      const { foodArr, userId, deleteFromFoodArr, addToFoodArr } = this.props
        return(
            <View 
            style={styles.tabContainer}
            >
              <ScrollView>
                <List>
                    {
                    foodArr && foodArr.map((item, i) => {
                      return <ListItem
                        key={i} title={item}
                        rightIcon={{name: 'clear'}}
                        onPressRightIcon={ ()=>{
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

                </List>
              </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

const mapStateToProps = (state) => ({
  foodArr: state.food.foodArr,
  userId: state.auth.user.id
});

const mapDispatchToProps = (dispatch) =>
  ({
    deleteFromFoodArr(item){ dispatch(deleteFromFoodArr(item)) },
    addToFoodArr(item){ dispatch(addToFoodArr(item)) }
  })

export default connect(mapStateToProps, mapDispatchToProps)(FoodSelector);
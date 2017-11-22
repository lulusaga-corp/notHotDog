import React, { Component } from 'react';
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

    handleSubmit(e) {
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
      .then(data => console.log("DATA", JSON.stringify(data)))
      .then(()=>Actions.AccountHome())
    }

    render () {
      const { foodArr, deleteFromFoodArr, addToFoodArr } = this.props
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
                      onPress={this.handleSubmit}
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
  foodArr: state.food.foodArr
});

const mapDispatchToProps = (dispatch) =>
  ({
    deleteFromFoodArr(item){ dispatch(deleteFromFoodArr(item)) },
    addToFoodArr(item){ dispatch(addToFoodArr(item)) }
  })

export default connect(mapStateToProps, mapDispatchToProps)(FoodSelector);
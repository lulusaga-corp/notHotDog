import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ButtonGroup } from "react-native-elements"
import PieChart from "./PieChart";

class AccountHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render () {
    const buttons = ["Today", 'Week', 'Month', "All"]
    const timeFrames = ["todaysMeals", "weekMeals", "monthMeals", "allMeals"]
    const mealReducer = timeFrame => timeFrame.map(meal =>{
      return meal.mealInstance.reduce((acc, foodItem) =>{
        acc.serving += foodItem.serving
        acc.data.protein += foodItem.data.protein
        acc.data.carbs += foodItem.data.carbs
        acc.data.fat += foodItem.data.fat
        return acc
      }, { serving: 0, data: { protein: 0, carbs: 0, fat: 0 }})
    }).reduce((acc, meal) =>{
        acc.serving += meal.serving
        acc.data.protein += meal.data.protein
        acc.data.carbs += meal.data.carbs
        acc.data.fat += meal.data.fat
        return acc
      },
      { serving: 0, data: { protein: 0, carbs: 0, fat: 0 }})

    const { selectedIndex } = this.state
    console.log("props in nut hist", this.props)
    return (
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 40}}/>
        {
          this.props.food.allMeals ? <PieChart allFoods={[mealReducer(this.props.food[timeFrames[this.state.selectedIndex]])]} /> : null
        }
      </View>
    )
  }
}

mapStateToProps = (state) =>({
  food: state.food
})

export default connect(mapStateToProps)(AccountHome);

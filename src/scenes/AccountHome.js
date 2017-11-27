import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ButtonGroup } from "react-native-elements"


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
    const buttons = ['Recent', "Today", 'Week', 'Month', "All"]
    const timeFrames = ["mostRecent", "todaysMeals", "weekMeals", "monthMeals", "allMeals"]
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

    this.props.food.allMeals ? console.dir(`meal summary from ${timeFrames[this.state.selectedIndex]}: 
    ${mealReducer(this.props.food[timeFrames[this.state.selectedIndex]]).data.protein}` ) : null

    const { selectedIndex } = this.state
    return (
      <View>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 40}}/>
      </View>
    )
  }
}

mapStateToProps = (state) =>({
  food: state.food
})

export default connect(mapStateToProps)(AccountHome);

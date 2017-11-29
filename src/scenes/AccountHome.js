import React, { Component } from "react";
import {StyleSheet, View, ScrollView } from "react-native";
import PieChart from "../components/PieChart";
import { getAllUserMeals } from '../store/food';
import { connect } from 'react-redux'
import { ButtonGroup } from "react-native-elements";

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
  componentWillMount () {
     this.props.userId && this.props.fetchAllMeals(this.props.userId)
  }


  render() {
    const mostRecent = this.props.mostRecent ? this.props.mostRecent : null
    const singleMeal = this.props.mealInstance ? this.props.mealInstance : mostRecent
    const { selectedIndex } = this.state
    let buttons = ["meal"]
    singleMeal && singleMeal.map((food) => {
      buttons.push(food.food_name)
    })
    // const foodChart = singleMeal ? mealReducer(this.props.food[timeFrames[this.state.selectedIndex]]) : null
    console.log('single meal', singleMeal)
    return (
      <ScrollView style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 40}}/>
        {
          singleMeal && singleMeal.map((food) => {
            // let chartData = [];
            // chartData.push(
            //   { x: "carbs", y: food.data.carbs },
            //   { x: "fat", y: food.data.fat },
            //   { x: "protein", y: food.data.protein }
            // );
            // console.log('account home food', food)
            return (
              <View>
                <PieChart allFoods={food} /> 
              </View>
            )
          })
        }
        
      
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => ({
  mostRecent: state.food.mostRecent,
  userId: state.auth && state.auth.user ? state.auth.user.uid : null
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountHome);
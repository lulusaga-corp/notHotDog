import React, { Component } from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";
import PieChart from "./PieChart";
import { getAllUserMeals } from '../modules/food';
import { connect } from 'react-redux'

import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart,
  VictoryLegend
} from "victory-native";
import { Svg } from "react-native-svg";

class AccountHome extends Component {

  componentWillMount () {
     this.props.userId && this.props.fetchAllMeals(this.props.userId)
  }


  render(props) {
    const mostRecent = this.props.mostRecent ? this.props.mostRecent : null
    const singleMeal = this.props.mealInstance ? this.props.mealInstance : mostRecent

    return (
      <View style={styles.container}>
        {
          singleMeal ? <PieChart allFoods={singleMeal} /> :
            null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

mapStateToProps = state => ({
  mostRecent: state.food.mostRecent,
  userId: state.auth && state.auth.user ? state.auth.user.uid : null
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountHome);
import React, { Component } from "react";
import {StyleSheet, View } from "react-native";
import PieChart from "../components/PieChart";
import { getAllUserMeals } from '../store/food';
import { connect } from 'react-redux'

class AccountHome extends Component {

  componentWillMount () {
     this.props.userId && this.props.fetchAllMeals(this.props.userId)
  }


  render() {
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
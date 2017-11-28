import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { VictoryPie, VictoryLegend, VictoryContainer } from "victory-native";
import { Svg } from "react-native-svg";
import SinglePieChart from './SinglePieChart';

class PieChart extends Component {
  render() {
    const foodCharts = this.props.allFoods
    return (
        <ScrollView contentContainerStyle={styles.container}>
          {foodCharts &&
            foodCharts.map((food, idx) => {
              let chartData = [];
              chartData.push(
                { x: "carbs", y: food.data.carbs },
                { x: "fat", y: food.data.fat },
                { x: "protein", y: food.data.protein }
              );
              return <SinglePieChart data={chartData} key={idx} foodName={food.food_name}/>
            })}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    marginTop: 0
  }
});

export default PieChart;


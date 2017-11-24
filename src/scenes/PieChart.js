import React, { Component } from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";
import IconContainer from "../components/IconContainer";
import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart
} from "victory-native";
import { Svg } from "react-native-svg";

class PieChart extends Component {
  render() {
    let allFoods = this.props.allFoods
    let foodCharts = [];
    if (allFoods) {
      allFoods.forEach(food => {
        let chart = {};
        chart.food_name = food.food_name;
        chart.serving = food.serving_weight_grams;
        chart.data = {};
        chart.data.protein = food.nf_protein;
        chart.data.carbs = food.nf_total_carbohydrate;
        chart.data.fat = food.nf_total_fat;
        foodCharts.push(chart);
      });
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          {foodCharts &&
            foodCharts.map((food, idx) => {
              let chartData = [];
              chartData.push(
                { x: "carbs", y: food.data.carbs },
                { x: "fat", y: food.data.fat },
                { x: "protein", y: food.data.protein }
              );
              return (
                <View key={idx} style={styles.graphBox}>
                  <Text> {food.food_name} </Text>
                  <Svg viewBox={"0 0 100, 100"}>
                    <VictoryPie
                      colorScale={["tomato", "orange", "gold"]}
                      data={chartData}
                      innerRadius={3}
                      padAngle={2}
                    />
                  </Svg>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  graphBox: {
    flex: 1,
    alignItems: "center"
  }
});

export default PieChart;


import React, { Component } from "react";
import { Image, Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import IconContainer from "../components/IconContainer";
import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart,
  VictoryLegend
} from "victory-native";
import { Svg } from "react-native-svg";
import { style } from "expo/src/Font";

class PieChart extends Component {
  render() {
    console.log("foodCharts", this.props.allFoods)
    const foodCharts = this.props.allFoods

    return (
        <ScrollView contentContainerStyle={styles.container}>
          {foodCharts &&
            foodCharts.map((food, idx) => {
              console.log("food from food",food)
              let chartData = [];
              chartData.push(
                { x: "carbs", y: food.data.carbs },
                { x: "fat", y: food.data.fat },
                { x: "protein", y: food.data.protein }
              );
              console.log("chartData",chartData)
              return (
                <View key={idx} style={styles.container}>
                  <Svg width={Dimensions.get("window").width} height={130}>
                    <VictoryLegend x={100} y={100}
                    centerTitle
                    orientation="horizontal"
                    gutter={10}
                    data={[
                      { name: "Carbs", symbol: { fill: "tomato" } },
                      { name: "Fat", symbol: { fill: "orange" } },
                      { name: "Protein", symbol: { fill: "gold" } }
                    ]}
                  />
                </Svg>
                <VictoryPie
                colorScale={["tomato", "orange", "gold"]}
                data={chartData}
                innerRadius={2}
                padAngle={2}
                style={{ labels: { fontSize: 1 } }}
                />
                <Text style={styles.title}>{food.food_name}</Text>
                </View>
              );
            })}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  }
  
});

export default PieChart;

import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { VictoryPie, VictoryLegend } from "victory-native";
import { Svg } from "react-native-svg";
import { Icon, List, ListItem, Card } from "react-native-elements";

class PieChart extends Component {
 
  render() {
    const unformatted = this.props.allFoods.data
    let chartData = [];
    chartData.push(
        { x: "carbs", y: unformatted.carbs },
        { x: "fat", y: unformatted.fat },
        { x: "protein", y: unformatted.protein }
    );
    return (
    
      <View style={styles.container}>
      <View style={styles.pie}>
        <VictoryPie
          colorScale={["tomato", "orange", "gold"]}
          data={chartData}
          innerRadius={100}
          padAngle={2}
          style={{ labels: { fontSize: 1 } }}
        />
      </View>
      <Card title="Source of Calories" containerStyle={styles.legend}>
        <View flexDirection="row">
          <View style={styles.legendItem} flexDirection="row"><Icon marginRight={2} name="label" color="tomato"/><Text style={styles.legendText}>Carbs</Text></View>
          <View style={styles.legendItem} flexDirection="row"><Icon marginRight={2} name="label" color="orange"/><Text style={styles.legendText}>Fat</Text></View>
          <View style={styles.legendItem} flexDirection="row"><Icon marginRight={2} name="label" color="gold"/><Text style={styles.legendText}>Protein</Text></View>
        </View>
      </Card>
      </View>
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
  },
  legend: {
    margin: -15
  },
  pie: {
    marginTop: -25
  },
  legendText: {
    marginTop: 3
  },
  legendItem: {
    marginRight: 10,
    justifyContent: "space-between"
  }
  
});

export default PieChart;

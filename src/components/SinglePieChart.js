import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { VictoryPie, VictoryLegend, VictoryContainer, VictoryChart } from "victory-native";
import { Svg } from "react-native-svg";



class SinglePieChart extends Component {
  render() {
    return(
    <View style={styles.chartContainer}>

        {/* <Svg width={Dimensions.get("window").width}> */}
          <VictoryLegend
          title="Source of Calories"
          style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
          centerTitle={true}
          orientation="horizontal"
          gutter={10}
          data={[
              { name: "Carbs", symbol: { fill: "tomato" } },
              { name: "Fat", symbol: { fill: "orange" } },
              { name: "Protein", symbol: { fill: "gold" } }
          ]}
          />
        {/* </Svg> */}
          <VictoryPie
          colorScale={["tomato", "orange", "gold"]}
          data={this.props.data}
          innerRadius={2}
          padAngle={2}
          style={{ labels: { fontSize: 1 } }}
          />
          {/* <Text style={styles.title}>{this.props.foodName}</Text> */}

    </View>
    )
  }
}


const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default SinglePieChart;
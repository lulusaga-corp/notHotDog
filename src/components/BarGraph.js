import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from "victory-native";
import { Svg } from "react-native-svg";
import { Icon, List, ListItem, Card } from "react-native-elements";

class BarGraph extends Component {
  
  
  
  render () {
    console.log('bar graph props', this.props.nutrients)
    const nutrients = this.props.nutrients ? this.props.nutrients.dv : null
    // let data = [];
    // nutrients && nutrients.forEach(nutrient => {
    //   data.push({x: nutrient.name, y: nutrient.percentdv})
    // })
    const data = [
      { x: "Vitamin C", y: 50},
      { x: "Calcium", y: 10},
      { x: "Vitamin D", y: 6},
      { x: "Vitamin B12", y: 24},
      { x: "Selenium", y: 6 }
    ]
    return (
      <View style={{alignItems: 'center', paddingTop: 15}}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 14, color: 'grey'}}>Nutrient Percent Daily Values</Text>
      <View style={{paddingTop: -15}}>
        <VictoryBar
          horizontal={true}
          data={data}
          height={1000}
          labels={(data) => `${data.x} - ${data.y}%` }
          style={{ data: { fill: "tomato", width: 15 } }}
          animate={{duration: 0, onLoad: {duration: 0}}}
          labelComponent={<VictoryLabel x={50} />}
        />
      </View>
      </View>
    )
  }
}

export default BarGraph;

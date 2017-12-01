import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from "victory-native";
import { Svg } from "react-native-svg";
import { Icon, List, ListItem, Card } from "react-native-elements";

class BarGraph extends Component {
  
  
  
  render () {
    const nutrients = this.props.nutrients ? this.props.nutrients.dv : null
    let nutrientNames = Object.keys(nutrients)
    let data = [];
    if (Array.isArray(nutrients)) {
      nutrients.forEach(nutrient => {
        data.push({x: nutrient.name, y: nutrient.percentdv})
      })  
    } else {
      nutrientNames.forEach(name => {
        data.push({x: name, y: nutrients[name]})
      })
    }
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

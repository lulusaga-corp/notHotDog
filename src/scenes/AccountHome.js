import React, { Component } from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";
import IconContainer from "../components/IconContainer";
import PieChart from "./PieChart";
import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart,
  VictoryLegend
} from "victory-native";
import { Svg } from "react-native-svg";

class AccountHome extends Component {
  
 render() {
    return (
        <View style={styles.container}>
          <PieChart allFoods={this.props.foods} />
        </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default AccountHome;

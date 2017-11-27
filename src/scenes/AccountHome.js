import React, { Component } from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";
import IconContainer from "../components/IconContainer";
import PieChart from "./PieChart";
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

  render(props) {
    return (
      <View style={styles.container}>
        {
          this.props.mostRecent ? <PieChart allFoods={this.props.mostRecent} /> :
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
  mostRecent: state.food.mostRecent
})

export default connect(mapStateToProps)(AccountHome);
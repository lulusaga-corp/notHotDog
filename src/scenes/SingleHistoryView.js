import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, ScrollView } from 'react-native';
import IconContainer from '../components/IconContainer';
import PieChart from './PieChart';
import { connect } from 'react-redux';

import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart,
  VictoryLegend
} from 'victory-native';
import { Svg } from 'react-native-svg';

class SingleHistoryView extends Component {
  render(props) {
    //get the timestamp going
    const singleMeal = this.props.mealInstance
    return (
      <View style={styles.container}>
      <Text>SingleHistoryView</Text>
        {singleMeal ? (
          <PieChart allFoods={singleMeal} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

mapStateToProps = state => ({
  mostRecent: state.food.mostRecent
});

export default connect(mapStateToProps)(SingleHistoryView);

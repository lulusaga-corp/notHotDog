import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PieChart from '../components/PieChart';
import { connect } from 'react-redux';

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

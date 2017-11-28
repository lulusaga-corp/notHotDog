import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import moment  from 'moment'

class History extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const { allMeals } = this.props

    return (
      <View style={styles.tabContainer}>
        <ScrollView>
        <View style={ styles.mealContainer }>
          {
            allMeals && allMeals.map((meal, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => Actions.SingleHistoryView(meal)}>
                  <Card title={meal.timestamp ? meal.timestamp.toString().split(' ').slice(0,5).join(' ') : null} >
                    <Text>{ meal.mealInstance.map(food=>food.food_name).join(', ') }</Text>
                  </Card>
                </TouchableOpacity>
              )
            })
          }
        </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  }
});

const mapPropsToState = state =>({
  allMeals: state.food.allMeals
})

export default connect(mapPropsToState)(History);

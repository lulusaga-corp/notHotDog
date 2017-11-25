import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import IconContainer from '../components/IconContainer';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'

class History extends Component {
  constructor(props){
    super(props)
    this.state = {
      meals: [{date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'},{date: 'june 30', food: 'potatoes'}]
    }
  }

  render () {
    const { allMeals } = this.props
    const {meals} = this.state
    console.log("allmeals", this.props.allMeals)

    return (
      <View style={styles.tabContainer}>
        <IconContainer />
        <View style={styles.mealContainer}>
          {
            allMeals && allMeals.map((meal, index) => {
              console.log('meal from map',meal)
              console.log("meal", meal)
              return (
                <TouchableOpacity key={index} onPress={() => console.log('preseeddd')}>
                  <Card title={meal.timestamp.toString(' ').split(' ').slice(0,5).join(' ')} >
                    <Text>{meal.mealInstance.map(food=>food.food_name).join(', ')}</Text>
                  </Card>
                </TouchableOpacity>
              )
            })
          }
        </View>
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

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';

class History extends Component {
  constructor(props){
    super(props)
    this.state = {
      meals: [{date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'},{date: 'june 30', food: 'potatoes'}]
    }
  }
  render () {
    const meals = this.state.meals;
    return (
      <View>
        <View>
          {
            meals.map((meal, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => console.log('preseeddd')}>
                  <Card title={meal.date} >
                    <Text>{meal.food}</Text>
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

export default History;

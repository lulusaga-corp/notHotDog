import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'

const History = (props) => {

  const { allMeals } = props

  return (
    <View style={styles.tabContainer}>
      <ScrollView>
      <View style={ styles.mealContainer }>
        {
          allMeals && allMeals.map((meal, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => Actions.SingleHistoryView(meal)}>
                <Card dividerStyle={styles.divider} flexDirection="column" containerStyle={ styles.container }
                      titleStyle={ styles.title } wrapperStyle={styles.wrapper}
                      title={meal.timestamp ? meal.timestamp.toString().split(' ').slice(0, 4).join(' ') : null} >
                  {
                    meal.mealInstance && meal.mealInstance.map((food, index) => (
                      <Text style={{textAlign:"center", padding:2}} key={index}>
                        { `${ food.food_name.charAt(0).toUpperCase().concat(food.food_name.slice(1)) }` }
                      </Text>
                    ))
                  }
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

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    backgroundColor: 'tomato',
    color: 'white',
    padding: 10,
    marginBottom: 4
  },
  container: {
    padding: 0,
    borderRadius: 4,
    borderColor: 'tomato'
  },
  divider: {
    display: 'none'
  },
  wrapper: {
    paddingBottom: 4
  }
});

const mapPropsToState = state => ({
  allMeals: state.food.allMeals
})

export default connect(mapPropsToState)(History);

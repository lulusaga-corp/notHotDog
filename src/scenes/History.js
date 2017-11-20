import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import IconContainer from '../components/IconContainer';
import { Card } from 'react-native-elements';

// import HistoryContainer from '../containers/LandingContainer';

class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            meals: [{date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'}, {date: 'june 30', food: 'potatoes'},{date: 'june 30', food: 'potatoes'}]
        }
    }
    render () {
        const meals = this.state.meals;
        console.log(meals)
        return (
            <View style={styles.tabContainer}>
                <IconContainer />
                <View style={styles.mealContainer}>
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

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

export default History;

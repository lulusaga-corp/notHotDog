import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import IconContainer from '../components/IconContainer';

class NutritionHistory extends Component {
    render () {
        return (
            <View style={styles.tabContainer}>
                <IconContainer />
                <Text>Hello from Nutrition History</Text>
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

export default NutritionHistory;

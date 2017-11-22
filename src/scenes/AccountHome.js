import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, ScrollView } from 'react-native';
import IconContainer from '../components/IconContainer';
import {
  VictoryPie,
  VictoryLabel,
  VictoryContainer,
  VictoryChart
} from 'victory-native';
import { Svg } from 'react-native-svg';

//import AccountSettings from '../containers/LandingContainer';

class AccountHome extends Component {
  render() {
    // console.log('acc home props ', this.props.foods && this.props.food);
    // let data;
    // if (this.props.foods) {
    //   const nutrients = this.props.foods[0];
    //   const serving = this.props.foods[0].serving_weight_grams;
    // //   console.log('serving', serving);
    //   let protein = nutrients.nf_protein;
    //   let carbs = nutrients.nf_total_carbohydrate;
    //   let fat = nutrients.nf_total_fat;
    //   data = [
    //     { x: 'protein', y: protein },
    //     { x: 'carbohydrates', y: carbs },
    //     { x: 'total fat', y: fat }
    //   ];
    // }
    let allFoods = this.props.foods
    let foodCharts = [];
    if (allFoods){
        allFoods.forEach(food => {
            let chart = {}
            chart.food_name = food.food_name
            chart.serving = food.serving_weight_grams
            chart.data = {}
            chart.data.protein = food.nf_protein
            chart.data.carbs = food.nf_total_carbohydrate
            chart.data.fat = food.nf_total_fat
            foodCharts.push(chart)
        })
        console.log('foodCharts for many', foodCharts)
    }
/*

rendering graphs not working yet
*/
  

    return(
    <ScrollView>
    <View style={styles.container}>
    <IconContainer />

        {foodCharts && foodCharts.map(food => {
            return(
                <View style={styles.graphBox}>
                    <Svg viewBox={'0 0 100, 100'}>
                    <VictoryPie colorScale={['tomato', 'orange', 'gold']} data={food.data} innerRadius={3} padAngle={2} /> 
                    </Svg> 
                </View>
                )
            })
        }
        
            </View>
            </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  graphBox: {
    flex: 1,
    alignItems: 'center'
  }
});

export default AccountHome;

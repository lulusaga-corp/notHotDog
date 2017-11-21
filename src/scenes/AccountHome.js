import React, { Component } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View
} from 'react-native';
import IconContainer from '../components/IconContainer';
import { VictoryPie, VictoryLabel, VictoryContainer, VictoryChart } from 'victory-native';
import { Svg } from 'react-native-svg'

//import AccountSettings from '../containers/LandingContainer';

class AccountHome extends Component {
    
    render () {
        // console.log('parsed stuff', this.props.parsed && this.props.parsed[0].nf_cholesterol)
        let data;
        if(this.props.parsed){
            const nutrients = this.props.parsed[0]
            const serving = this.props.parsed[0].serving_weight_grams
            console.log('serving', serving)
            let protein = nutrients.nf_protein;
            let carbs = nutrients.nf_total_carbohydrate;
            let fat = nutrients .nf_total_fat;         
            data = [ 
                { x: 'protein', y: protein }, 
                { x: 'carbohydrates', y: carbs }, 
                { x: 'total fat', y: fat }, 
                
            ]
        }
        return (
            <View style={styles.container}>
                <IconContainer />
                <View style={styles.graphBox}>
                {
                    data && 
                    <Svg viewBox={"0 0 100, 100"}>
                        <VictoryPie
                            colorScale={['tomato', 'orange', 'gold']} 
                            data={data}
                            innerRadius={3}
                            padAngle={2} 
                            />
                    </Svg>
                }
                <Text>Testing Alignment</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphBox: {
        flex: 1,
        alignItems: 'center',
    }
});

export default AccountHome;

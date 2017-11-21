import React, { Component } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    View
} from 'react-native';
import IconContainer from '../components/IconContainer';
import { VictoryPie, VictoryLabel } from 'victory-native';

//import AccountSettings from '../containers/LandingContainer';

class AccountHome extends Component {
    render () {
        console.log('parsed stuff', this.props.parsed)
        const nutrients = this.props.parsed
        const serving = this.props.parsed.serving_weight_grams 
        const data = {[{ cholesterol: , y: nutrients[nf_cholesterol] * 100 / 28000 }, { x: 'potassium', y: 21.28 * 100 / 28000 }, { x: 'sodium', y: 182.84 * 100 / 28000 }, { x: 'phat', y: 5.28 * 100 / 28000 }, { x: 'fat', y: 5.28 * 100 / 28000 }]}
        return (<View style={styles.container}>
            <IconContainer />
            <VictoryPie colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']} data={data} />
          </View>)
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

export default AccountHome;

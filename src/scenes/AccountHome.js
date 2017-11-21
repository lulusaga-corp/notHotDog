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
        // console.log('parsed stuff', this.props.parsed && this.props.parsed[0].nf_cholesterol)
        let data;
        if(this.props.parsed){
            const nutrients = this.props.parsed[0]
            const serving = this.props.parsed[0].serving_weight_grams
            console.log('serving', serving)
            let cholestersol = ( Number(nutrients.nf_cholesterol) / 1000 ) / serving
            console.log(cholestersol)
            let sodium = ( Number(nutrients.nf_sodium) / 1000 ) / serving            
            data = [ 
                { x: 'cholestersol', y: cholestersol }, 
                // { x: 'sodium', y: ((Number(nutrients.nf_sodium)/1000) * 100 / serving) }, 
                // { x: 'total fat', y: ( nutrients.nf_total_fat * 100 / serving ) }, 
                // { x: 'protein', y: ( nutrients.nf_protein * 100 / serving ) * 100 / serving }, 
                // { x: 'dietary fiber', y: ( nutrients.nf_dietary_fiber * 100 / serving ) * 100 / serving },
                // { x: 'sugar', y: ( nutrients.nf_sugars * 100 / serving ) * 100 / serving }
            ]
            // data = [ 
            //     { x: 'cholestersol', y: 45 }, 
            //     { x: 'sodium', y: 65 }, 
            //     // { x: 'total fat', y: ( nutrients.nf_total_fat * 100 / serving ) }, 
            //     // { x: 'protein', y: ( nutrients.nf_protein * 100 / serving ) * 100 / serving }, 
            //     // { x: 'dietary fiber', y: ( nutrients.nf_dietary_fiber * 100 / serving ) * 100 / serving },
            //     // { x: 'sugar', y: ( nutrients.nf_sugars * 100 / serving ) * 100 / serving }
            // ]
        }
        return (
            <View style={styles.container}>
                <IconContainer />
                {
                    data && <VictoryPie colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'pink']} data={data} />
                }
                {/* <Text>Here</Text> */}
                
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

export default AccountHome;

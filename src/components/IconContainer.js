import React from 'react';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet } from 'react-native';

const IconContainer = () => {
    return (
        <View style={styles.iconContainer}>
            <Icon raised name="camera" color='#00aced' reverse onPress={() => { Actions.camera() }} />
            <Icon raised name="settings" color='#517fa4' reverse onPress={() => { console.log('going to setting page') }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default IconContainer;
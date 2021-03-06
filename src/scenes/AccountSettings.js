import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { signOutUser } from '../store/auth';
import { connect } from 'react-redux';

const AccountSettings = (props) =>  {
  return (
    <View>
      <List>
        <ListItem key="userInfo" title="Edit Account Info" onPress={() => { Actions.userInfo() }} />
        <ListItem key="dietary" title="Edit Dietary Preferences" onPress={() => { Actions.dietary() }} />
        <ListItem key="delete" title="Delete Your Account" onPress={() => { Actions.deleteAccount() }} />
      </List>
      <Button buttonStyle={styles.signout} title="Sign Out" onPress={props.signOutUser} />
    </View>
  )
}

const styles = StyleSheet.create({
  signout: {
    marginTop: 5,
    backgroundColor: '#ef4836',
    borderRadius: 5
  }
})

const mapStateToProps = (state) => {
  return {
    userFirstName: state.auth.user ? state.auth.user.displayName : null,
  }
}
export default connect(mapStateToProps, {signOutUser})(AccountSettings);

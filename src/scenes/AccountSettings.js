import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import UserInfo from '../components/settings/UserInfo';
import DietaryInfo from '../components/settings/DietaryInfo';
import AccountManagement from '../components/settings/AccountManagement';
import { List, ListItem, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { signOutUser } from '../modules/auth';
import { connect } from 'react-redux';

const AccountSettings = (props) =>  {
  return (
    <View>
      <List>
        <ListItem key="userInfo" title="Edit Account Info" onPress={() => { Actions.userInfo() }} />
        <ListItem key="dietary" title="Edit Dietary Preferences" onPress={() => { Actions.dietary() }} />
        <ListItem key="delete" title="Delete Your Account" onPress={() => { Actions.deleteAccount() }} />
      </List>
      <Button title="sign out" onPress={props.signOutUser} />
    </View>
  )
}

export default connect(() => ({}), {signOutUser})(AccountSettings);

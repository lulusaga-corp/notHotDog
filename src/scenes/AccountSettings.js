import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import UserInfo from '../components/settings/UserInfo';
import DietaryInfo from '../components/settings/DietaryInfo';
import AccountManagement from '../components/settings/AccountManagement'

const AccountSettings = () =>  {
  return (
    <View>
      <View>
        <Text>Account Information</Text>
        <UserInfo />
      </View>
      <View>
        <Text>Special Dietary Notes</Text>
        <DietaryInfo />
      </View>
      <View>
        <Text>Account Management</Text>
        <AccountManagement />
      </View>
    </View>
  )
}

export default AccountSettings
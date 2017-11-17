import React, { Component } from 'react'
import {Text} from 'react-native'

/**
 * Navigation Tab
 */
const Tab = ({selected, title}) => {

 let defaultStyles = {
  
  };

 return (
    <Text style={defaultStyles}>{title}</Text>
  );

};

export default Tab

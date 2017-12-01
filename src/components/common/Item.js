/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const defaultProps = {
  style: {},
};

const Item = props => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);

const styles = {
  container: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative",
    marginRight: 10,
    marginLeft: 10
  }
};

Item.defaultProps = defaultProps;
Item.propTypes = propTypes;

export { Item };

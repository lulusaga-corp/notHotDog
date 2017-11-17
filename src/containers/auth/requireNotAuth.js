import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object
};

const defaultProps = {
  user: null,
};

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (this.props.user) {
        Actions.LoggedInLanding();
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user) {
        Actions.LoggedInLanding();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.defaultProps = defaultProps;
  Authentication.propTypes = propTypes;

  const mapStateToProps = ({ auth }) => ({ user: auth.user });

  return connect(mapStateToProps)(Authentication);
}

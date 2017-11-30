import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { signInUser, clearState } from '../../store/auth';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Container, Input, Button, Item, Spinner } from '../../components/common/index';
import styles from './authStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const background = require("../../../starwberry2.jpg");

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.userId ? null : this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;

    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={styles.container}>
      <Image source={background} style={styles.background} resizeMode="cover">
      <Container>
        <Item> 
          <Field
            name="email"
            component={Input}
            placeholder="Email"
            autoCapitalize={'none'}
          />
        </Item>

        <Item>
          <Field
            name="password"
            component={Input}
            secureTextEntry
            placeholder="Password"
          />
        </Item>

        {this.props.authError
          ?
            <Text style={styles.error}>
              {this.props.authError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Log in</Button>
            </Item>}

        <Item>
          <TouchableOpacity
            onPress={() => Actions.signup()}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>
              Don't have an account? Click here to sign up
            </Text>
          </TouchableOpacity>
        </Item>
      </Container>
      </Image>
      </View>
    )
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};

Signin.propTypes = propTypes;
Signin = reduxForm({ form: 'signin', validate })(Signin);

const mapStateToProps = ({auth}) => ({
  authError: auth.error,
  loading: auth.loading ,
  userId: auth && auth.user  ? auth.user.uid : ''
});



export default connect(mapStateToProps, { signInUser, clearState })(Signin);

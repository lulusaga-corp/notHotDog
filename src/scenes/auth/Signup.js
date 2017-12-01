import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Input,
  Button,
  Item,
  Spinner
} from "../../components/common/index";
import styles from "./authStyle";
import { signUpUser, clearState } from "../../store/auth";

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const background = require("../../../starwberry2.jpg");

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password, firstname, lastname } = props;

    this.props.signUpUser({ email, password, firstname, lastname });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Image source={background} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          <Container>
            <Item>
              <Field
                name="firstname"
                component={Input}
                placeholder="First name"
              />
            </Item>
          </Container>  
          <Container>
            <Item>
              <Field
                name="lastname"
                component={Input}
                placeholder="Last name"
              />
            </Item>
          </Container>
          <Container>
            <Item>
              <Field
                name="email"
                component={Input}
                placeholder="Email"
                autoCapitalize={"none"}
              />
            </Item>
          </Container>
          <Container>
            <Item>
              <Field
                name="password"
                component={Input}
                secureTextEntry
                placeholder="Password"
              />
            </Item>
          </Container>
          <Container>
            <Item>
              <Field
                name="repassword"
                component={Input}
                secureTextEntry
                placeholder="Repeat Password"
              />
            </Item>
          </Container>
            {this.props.authError ? (
              <Text style={styles.error}>{this.props.authError}</Text>
            ) : (
              <View />
            )}

            {this.props.loading ? (
              <Item style={styles.loadingContainer}>
                <Spinner />
              </Item>
            ) : (
              <Container>
                <Button onPress={handleSubmit(this.handleFormSubmit)}>
                  Sign Up
                </Button>
              </Container>
            )}
           
          
        </View>
      </Image>
    );
  }
}

const validate = props => {
  const errors = {};
  const fields = ["firstname", "lastname", "email", "password"];

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.firstname && props.firstname.length < 3) {
    errors.firstname = "Minimum of 3 characters";
  } else if (props.firstname && props.firstname.length > 20) {
    errors.firstname = "Maximum of 20 characters";
  }

  if (props.lastname && props.lastname.length < 3) {
    errors.lastname = "Minimum of 3 characters";
  } else if (props.lastname && props.lastname.length > 20) {
    errors.lastname = "Maximum of 20 characters";
  }

  if (
    props.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)
  ) {
    errors.email = "please provide valid email";
  }

  if (props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
};

Signup.propTypes = propTypes;
Signup = reduxForm({ form: "signup", validate })(Signup);

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signUpUser, clearState })(Signup);

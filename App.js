import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import Config from 'react-native-config';
import firebase from 'firebase';
import LoginForm from './components/login/LoginForm'


class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCrC5z7j5oIYkFc-Tm5n3DMmgs2DzYc0OI",
      authDomain: "lulusaga-app.firebaseapp.com",
      databaseURL: "https://lulusaga-app.firebaseio.com",
      projectId: "lulusaga-app",
      storageBucket: "lulusaga-app.appspot.com",
      messagingSenderId: "543277449359"
    });
  }
  render() {
    return (
      <View>
        <LoginForm />
      </View>
    );
  }
}

export default App;
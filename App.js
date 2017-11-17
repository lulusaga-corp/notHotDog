import React, { Component } from "react";
import { Scene, Router, TabBar, Icon } from "react-native-router-flux";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from 'firebase';
import LoginForm from './components/login/LoginForm'

// Containers go here:
import LoggedInLanding from "./src/scenes/LoggedInLanding"; /* to navigate to camera or account home */
import AccountHome from "./src/scenes/AccountHome"; /* to display most recent meal */
import AccountSettings from "./src/scenes/AccountSettings"; /* to edit user account settings */
import History from "./src/scenes/History"; /* to see all past meal data */


export default class App extends Component<{}> {
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
      <Router>
        <Scene key="root">
          <Scene
            key="Login"
            initial={true}
            component={LoginForm}
            title="Welcome"
            direction="vertical"
          />
          <Scene
          key="LoggedInLanding"
          component={LoggedInLanding}
          title="Welcome"
          direction="vertical"
          />
          <Scene key="tabbar" tabs={true} tabBarStyle={ {backgroundColor: "#d4d6d8"} }>
            <Scene key="AccountHome" title="Most Recent Meal" initial={true}>
              <Scene
                key="account"
                component={AccountHome}
                title="Account Home"
              />
            </Scene>
            <Scene key="history" labelStyle="fontSize: 12" title="Meal History">
              <Scene key="accountHistory" component={History} title="History" />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
});

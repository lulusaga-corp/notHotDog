import React, { Component } from "react";
import { Scene, Router, TabBar, Icon } from "react-native-router-flux";
import { Platform, StyleSheet, Text, View } from "react-native";

// Containers go here:

import LoggedInLanding from "./src/scenes/LoggedInLanding"; /* to navigate to camera or account home */
import AccountHome from "./src/scenes/AccountHome"; /* to display most recent meal */
import AccountSettings from "./src/scenes/AccountSettings"; /* to edit user account settings */
import History from "./src/scenes/History"; /* to see all past meal data */

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="LoggedInLanding"
            initial={true}
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

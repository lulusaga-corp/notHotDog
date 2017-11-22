import React from "react";
import { Scene, Router, TabBar, Icon } from "react-native-router-flux";
import Signin from '../containers/auth/Signin';
import Signup from '../containers/auth/Signup';
import requireAuth from '../containers/auth/requireAuth';
import requireNotAuth from '../containers/auth/requireNotAuth';
// Containers go here:
import LoggedInLanding from "../scenes/LoggedInLanding"; /* to navigate to camera or account home */
import AccountHome from "../scenes/AccountHome"; /* to display most recent meal */
import AccountSettings from "../scenes/AccountSettings"; /* to edit user account settings */
import History from "../scenes/History"; /* to see all past meal data */
import Camera from "../scenes/Camera"; /* access to the camera */
import NutritionHistory from "../scenes/NutritionHistory";
import FoodSelector from "../scenes/FoodSelector";

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="auth">
        <Scene key="signup" component={requireNotAuth(Signup)} title="Please Sign up" />
        <Scene key="signin" component={requireNotAuth(Signin)} title="Please Sign in" />
      </Scene>
      <Scene key="settings" component={AccountSettings} title="Account Settings" />
      <Scene key="camera" component={Camera} title="Camera" />
      <Scene key="FoodSelector" component={FoodSelector} title="Select" />
      <Scene key="tabbar" tabs={true} tabBarStyle={ {backgroundColor: "#d4d6d8"}}>
        <Scene key="AccountHome" title="Most Recent Meal" initial={true} component={AccountHome} />
        <Scene key="history" title="Meal History" component={History} />
        <Scene key="nutrition" title="Nutrition History" component={NutritionHistory} />
      </Scene>
    </Scene>
  </Router>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllUserMeals } from './store/food';
import { StyleSheet } from 'react-native';
import { Scene, Router, TabBar, Actions } from 'react-native-router-flux';
import { Icon, Title } from 'react-native-elements';
import requireNotAuth from './scenes/auth/requireNotAuth';
// SCENES ---------------------------
import Signin from './scenes/auth/Signin';
import Signup from './scenes/auth/Signup';
import AccountHome from './scenes/AccountHome'; /* to display most recent meal */
import AccountSettings from './scenes/AccountSettings'; /* to edit user account settings */
import History from './scenes/History'; /* to see all past meal data */
import Camera from './scenes/Camera'; /* access to the camera */
import NutritionHistory from './scenes/NutritionHistory';
import FoodSelector from './scenes/FoodSelector';
import SingleHistoryView from './scenes/SingleHistoryView'
import DietaryInfo from "./scenes/settings/DietaryInfo";
import UserInfo from "./scenes/settings/UserInfo";
import AccountManagement from "./scenes/settings/AccountManagement";

class RouterComponent extends Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      nextProps.userId && this.props.fetchAllMeals(nextProps.userId)
    }
  }

  componentDidMount() {
      this.props.userId && this.props.fetchAllMeals(this.props.userId)
  }

  render () {
    return (
      <Router style={styles.container}>
        <Scene
          key="root"
          navigationBarStyle={styles.navBar}
          nagivationTitleStyle={styles.navBar}
        >
          <Scene key="auth" title="Welcome" hideNavBar={true}>
            <Scene key="signin" component={requireNotAuth(Signin)} />
            <Scene key="signup" component={requireNotAuth(Signup)} />
          </Scene>
          <Scene key="settings" component={AccountSettings} title="Account Settings" />
          <Scene key="deleteAccount" component={AccountManagement} title="Delete Account" />
          <Scene key="dietary" component={DietaryInfo} title="Edit Dietary Preferences" />
          <Scene key="userInfo" component={UserInfo} title="Edit Account Info" />

          <Scene key="FoodSelector" component={FoodSelector} title="Select" />
          <Scene key="SingleHistoryView" component={SingleHistoryView} title="SingleHistoryView" />
          <Scene
            key="tabbar" tabs={true} showLabel={false} swipeEnabled={true} tabBarStyle={styles.tabContainer} activeBackgroundColor="#76ffe9"
            renderRightButton={() => {
              return <Icon name="settings" underlayColor="#36d7b7" onPress={() => Actions.settings() } />
            }}>
            <Scene key="AccountHome" title="Your Latest Meal"
                   icon={() => <Icon name="local-dining" />}  component={AccountHome} />
            <Scene key="history" title="Meal Diary"
                   icon={() => <Icon name="date-range" />} component={History} />
            <Scene key="nutrition" title="Nutrition History"
                   icon={() => <Icon name="assessment" />} component={NutritionHistory} />
            <Scene key="camera" title="Camera" component={Camera}
                   icon={() => <Icon name="camera-alt" />} initial={true} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: '#36d7b7',
    padding: 10
  },
  navTitle: {
    color: 'black'
  },
  tabContainer: {
    backgroundColor: '#36d7b7'
  }
})
const mapStateToProps = (state) => ({
  userId: state.auth && state.auth.user ? state.auth.user.uid : null
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent)


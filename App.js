import React, { Component } from 'react';
import firebaseConfig from './firebaseConfig.json';
firebase.initializeApp(firebaseConfig);
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './src/Router';
import store from './configureStore';
import { SIGN_IN_SUCCESS, GET_API_KEYS, GET_USER_PROFILE } from './src/store/auth'
import { Spinner } from './src/components/common';
import {Actions} from 'react-native-router-flux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        firebase.firestore().collection(`env`).get()
          .then(snapshot => {
            let apiKeys=[]
            snapshot.forEach(doc => apiKeys.push(doc.data()))
            store.dispatch({type: GET_API_KEYS, payload:apiKeys})
            return firebase.firestore().collection(`users`).doc(`${user.uid}`).get()})
          .then(res => {
            const userProfile = res.data()
            store.dispatch({type:GET_USER_PROFILE, payload: userProfile})
            this.setState({ loaded: true });
            Actions.camera()
            })
          .catch(console.error)
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loaded ? <Router /> : <Spinner />}
      </Provider>
    );
  }
}

export default App;

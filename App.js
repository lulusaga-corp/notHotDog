import React, { Component } from 'react';
import firebaseConfig from './firebaseConfig.json';
firebase.initializeApp(firebaseConfig);
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './src/Router';
import store from './configureStore';
import {
  SIGN_IN_SUCCESS, GET_API_KEYS, GET_USER_FIRST_NAME,
  GET_USER_LAST_NAME, GET_USER_DIETARY, GET_USER_ALLERGIES
} from './src/store/auth'
import { Spinner } from './src/components/common';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loaded: true });

      if (user) {
        store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
        firebase.firestore().collection(`env`).get()
          .then(snapshot => {
            let apiKeys=[]
            snapshot.forEach(doc => apiKeys.push(doc.data()))
            store.dispatch({type: GET_API_KEYS, payload:apiKeys})
          })
          .catch(console.error)
        firebase.firestore().collection(`users`).doc(`${user.uid}`).get()
          .then(res => {
            const userProfile = res.data()
            store.dispatch({type:GET_USER_FIRST_NAME, payload: userProfile.firstname})
            store.dispatch({type:GET_USER_LAST_NAME, payload: userProfile.lastname})
            store.dispatch({type:GET_USER_DIETARY, payload: userProfile.dietary})
            store.dispatch({type:GET_USER_ALLERGIES, payload: userProfile.allergies})
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

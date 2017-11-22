import React, { Component } from 'react';
import firebaseConfig from './firebaseConfig.json';
firebase.initializeApp(firebaseConfig);

import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './src/components/Router';
import store from './configureStore';
import { SIGN_IN_SUCCESS } from './src/modules/auth';
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

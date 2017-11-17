import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './Router';
import store from './configureStore';
import { SIGN_IN_SUCCESS } from './src/modules/auth';
import { Spinner } from './src/components/common';
import firebaseConfig from './firebaseConfig.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

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

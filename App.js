import React, { Component } from 'react';
import firebaseConfig from './firebaseConfig.json';
firebase.initializeApp(firebaseConfig);
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './src/Router';
import store from './configureStore';
import { SIGN_IN_SUCCESS } from './src/store/auth';
import { Spinner } from './src/components/common';
import { GET_API_KEYS } from './src/store/auth'

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
          return firebase.firestore().collection(`env`).get()
          .then(snapshot => {
           let apiKeys=[]
            snapshot.forEach(doc => apiKeys.push(doc.data()))
            store.dispatch({type: GET_API_KEYS, payload:apiKeys})
          })
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

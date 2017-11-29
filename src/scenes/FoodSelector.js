import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getAllUserMeals } from '../store/food'
import storeMeal from '../utilities/storeMeal';

class FoodSelector extends Component {
  constructor (props) {
    super(props);
    this.state = {
      foodArr: props.foodArr,
      foodInput: '',
      error: '',
      xAppId: "",
      xAppKey: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    return firebase.firestore().doc(`env/nutrionix`)
      .get()
      .then(snapshot =>{
        const nutrionix = snapshot.data()
        this.setState({ xAppId: nutrionix.id, xAppKey: nutrionix.key})
      })

  }

  handleSubmit (userId) {
    if (!userId) return;
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query: this.state.foodArr.join(", ")
    }, {
      headers: {
        "x-app-id": this.state.xAppId,
        "x-app-key": this.state.xAppKey,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.data)
      .then(data => {
        storeMeal(data, userId)
      })
      .catch(()=>this.setState({error: true}))
  }

  render () {
    const {userId} = this.props
    const {foodArr} = this.state

    return (
      <View style={styles.tabContainer}>
        <ScrollView>
          <List>
            {
              foodArr && foodArr.map((item, i) => {
                return <ListItem
                  key={i} title={item}
                  rightIcon={{name: 'clear'}}
                  onPressRightIcon={() => this.deleteFromFoodArr(item)}/>
              })
            }
            <ListItem
              textInput={true}
              textInputValue={this.state.foodInput}
              textInputOnChangeText={(text) => {
                this.setState({foodInput: text})
              }}
              textInputPlaceholder={'Add other foods...'}
              rightIcon={{name: 'add'}}
              textInputAutoCorrect={true}
              textInputAutoCapitalize={"none"}
              onPressRightIcon={() => this.addToFoodArr(this.state.foodInput)}/>
            <ListItem
              onPress={() =>{
                console.log("user ID", userId)
                this.handleSubmit(userId)
              }}
              title="Click here to submit!"
              hideChevron={true}
            />
          </List>
          {
            this.state.error ? <Text>We could not find one of the foods you entered in our database as it was typed. Please try again!</Text> : null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column"
  }
});

const mapStateToProps = state => ({
  userId: state.auth && state.auth.user  ? state.auth.user.uid : ''
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodSelector);
import React, { Component } from "react";
import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { List, ListItem, Button } from "react-native-elements";

class FoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: this.props.response,
      foodInput: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: this.state.response.join(", ")
        },
        {
          headers: {
            "x-app-id": "da40e3ba",
            "x-app-key": "9039730dc95644122941bec700a3ebe4",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => res.data)
      .then(data => {
        let keys = Object.keys(data.foods[0]).slice(0, 17);
        return data.foods.map(food => {
          return keys.reduce((acc, cur) => {
            acc[cur] = food[cur];
            return acc;
          }, {});
        });
      })
      .then(parsed => Actions.AccountHome({parsed}))
  }

  render() {
    console.log("state", this.state);
    const filtered = this.state.response;
    return (
      <View style={styles.tabContainer}>
        <ScrollView>
          <List>
            {filtered &&
              filtered.map((item, i) => {
                return (
                  <ListItem
                    key={i}
                    title={item}
                    rightIcon={{ name: "clear" }}
                    onPressRightIcon={item => {
                      let stateArr = this.state.response.slice();
                      stateArr.splice(i, 1);
                      this.setState({ response: stateArr });
                    }}
                  />
                );
              })}
            <ListItem
              textInput={true}
              textInputValue={this.state.foodInput}
              textInputOnChangeText={text => {
                this.setState({ foodInput: text });
              }}
              textInputPlaceholder={"Add other foods..."}
              rightIcon={{ name: "add" }}
              textInputAutoCorrect={true}
              textInputAutoCapitalize={"none"}
              onPressRightIcon={() => {
                let stateArr = this.state.response.slice();
                stateArr.push(this.state.foodInput);
                this.setState({ response: stateArr });
                this.setState({ foodInput: "" });
              }}
            />
            <ListItem
              onPress={this.handleSubmit}
              title="Click here to submit!"
              hideChevron={true}
            />
          </List>
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
  response: state.food.foodArr
});

export default connect(mapStateToProps)(FoodSelector);

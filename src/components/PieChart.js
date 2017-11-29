import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { VictoryPie, VictoryLegend } from "victory-native";
import { Svg } from "react-native-svg";
import { Icon, List, ListItem, Card } from "react-native-elements";

class PieChart extends Component {
  render() {
    const unformatted = this.props.allFoods.data
    let chartData = [];
    chartData.push(
        { x: "carbs", y: unformatted.carbs },
        { x: "fat", y: unformatted.fat },
        { x: "protein", y: unformatted.protein }
    );
    return (
    
      <View style={styles.container}>
        
      <VictoryPie
      colorScale={["tomato", "orange", "gold"]}
      data={chartData}
      innerRadius={100}
      padAngle={2}
      style={{ labels: { fontSize: 1 } }}
      />
      {/* <Text style={styles.title}>{food.food_name}</Text> */}
      {/* <Svg width={Dimensions.get("window").width} height={130}>
          <VictoryLegend x={100} y={100}
          centerTitle
          orientation="horizontal"
          itemsPerRow={3}
          gutter={10}
          data={[
            { name: "Carbs", symbol: { fill: "tomato" } },
            { name: "Fat", symbol: { fill: "orange" } },
            { name: "Protein", symbol: { fill: "gold" } }
          ]}
        />
      </Svg> */}
        <Card title="Source of Calories" containerStyle={styles.legend}>
          <Icon name="label" color="tomato"/><Text>Carbs</Text>
          <Icon name="label" color="orange"/><Text>Fat</Text>
          <Icon name="label" color="gold"/><Text>Protein</Text>
        </Card>
        {/* <Card title="Source of Calories">
        <List>
              <ListItem key="carbs" title="Carbs" leftIcon={{name: "label", color:"tomato"}}/>
              <ListItem key="fat" title="Fat" leftIcon={{name: "label", color:"orange"}}/>
              <ListItem key="protein" title="Protein" leftIcon={{name: "label", color:"gold"}}/>
        </List>
        </Card> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  lenged: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // alignContent: 'flex-start',
    // alignSelf: 'flex-start',
    flexWrap: 'nowrap'
  }
  
});

export default PieChart;

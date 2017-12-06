import React from 'react';
import { Text, View } from 'react-native';
import { VictoryBar, VictoryLabel } from 'victory-native';

const BarGraph = (props) => {

  const nutrients = props.nutrients ? props.nutrients.dv : null
  let nutrientNames = Object.keys(nutrients)
  let data = [];
  if (Array.isArray(nutrients)) {
    nutrients.forEach(nutrient => {
      data.push({ x: nutrient.name, y: nutrient.percentdv })
    });
  } else {
    nutrientNames.forEach(name => {
      data.push({x: name, y: nutrients[name]})
    })
  }

  return (
    <View style={{alignItems: 'center', paddingTop: 15}}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 14, color: 'grey'}}>Nutrient Percent Daily Values</Text>
      <View style={{paddingTop: -15}}>
        <VictoryBar
          horizontal={true}
          data={data}
          height={1000}
          labels={(data) => `${data.x} - ${data.y}%`}
          style={{data: { fill: 'tomato', width: 15 }}}
          animate={{duration: 0, onLoad: {duration: 0}}}
          labelComponent={<VictoryLabel x={50} />}
        />
      </View>
    </View>
  )
}

export default BarGraph;

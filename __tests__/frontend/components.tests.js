import React from 'react';
import {Button, Confirm, Container, Header, Input, Item, Spinner} from '../../src/components/common';
import CameraGallery from '../../src/components/CameraGallery';
import BarGraph from '../../src/components/BarGraph';
import PieChart from '../../src/components/PieChart';

import renderer from 'react-test-renderer';
import { createStore } from 'redux';

/* Common Components */
describe('Button component', () => {
  it('renders without crashing', () => {
    const renderedButton = renderer.create(<Button onPress={() => {}} children={[]}/>).toJSON();
    expect(renderedButton).toMatchSnapshot();
  })
})

describe('Confirm component', () => {
  it('renders without crashing', () => {
    const renderedConfirm = renderer.create(
      <Confirm 
        onPress={() => {}} 
        children={[]} 
        visible={true} 
        onAccept={() => {}}
        onDecline={() => {}}
      />).toJSON();
    expect(renderedConfirm).toMatchSnapshot();
  })
})

describe('Container component', () => {
  it('renders without crashing', () => {
    const renderedContainer = renderer.create(<Container children={[]}/>).toJSON();
    expect(renderedContainer).toMatchSnapshot();
  })
})

describe('Header component', () => {
  it('renders without crashing', () => {
    const renderedHeader = renderer.create(<Header headerText={''}/>).toJSON();
    expect(renderedHeader).toMatchSnapshot();
  })
})

describe('Input component', () => {
  it('renders without crashing', () => {
    const renderedInput = renderer.create(
      <Input 
        input={{}} 
        meta={{}} 
        placeholder={''}
      />).toJSON();
    expect(renderedInput).toMatchSnapshot();
  })
})

describe('Item component', () => {
  it('renders without crashing', () => {
    const renderedItem = renderer.create(<Item children={[]}/>).toJSON();
    expect(renderedItem).toMatchSnapshot();
  })
})

describe('Spinner component', () => {
  it('renders without crashing', () => {
    const renderedSpinner = renderer.create(<Spinner />).toJSON();
    expect(renderedSpinner).toMatchSnapshot();
  })
})

/* Camera Roll Component */
describe('Camera Gallery scene', () => {
  it('renders without crashing', () => {
    const renderedCameraGallery = renderer.create(<CameraGallery />).toJSON();
    expect(renderedCameraGallery).toMatchSnapshot();
  });
})

/* Graph Components */
describe('Pie Chart', () => {
  it('renders without crashing', () => {
    let allFoods = {data: {}};
    const renderedPieChart = renderer.create(<PieChart allFoods={allFoods}/>).toJSON();
    expect(renderedPieChart).toMatchSnapshot();
  });
})

describe('Bar Graph', () => {
  it('renders without crashing', () => {
    let allFoods = {data: {}, dv: {calcium: 2, potassium: 12}};
    const renderedBarGraph = renderer.create(<BarGraph nutrients={allFoods}/>).toJSON();
    expect(renderedBarGraph).toMatchSnapshot();
  });
})
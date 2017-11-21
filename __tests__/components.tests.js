import React from 'react';
// import Signin from '../src/components/auth/Signin';
import {Button, Confirm, Container, Header, Input, Item, Spinner} from '../src/components/common';
import IconContainer from '../src/components/IconContainer';

import renderer from 'react-test-renderer';
import { createStore } from 'redux';

/* Auth Components */
// Try these later??

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

/* Icon Container */
describe('Icon Container component', () => {
  it('renders without crashing', () => {
    const renderedIconContainer = renderer.create(<IconContainer />).toJSON();
    expect(renderedIconContainer).toMatchSnapshot();
  })
})
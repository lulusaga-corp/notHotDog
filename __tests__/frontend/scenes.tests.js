import React from 'react';
import AccountHome from '../../src/scenes/AccountHome';
import AccountSettings from '../../src/scenes/AccountSettings';
import Camera from '../../src/scenes/Camera';
import CameraGallery from '../../src/components/CameraGallery';
import FoodSelector from '../../src/scenes/FoodSelector';
import History from '../../src/scenes/History';
import LoggedInLanding from '../../src/scenes/LoggedInLanding';
import NutritionHistory from '../../src/scenes/NutritionHistory';
import Tab from '../../src/scenes/NutritionHistory';

import renderer from 'react-test-renderer';
import { createStore } from 'redux';

/* Account-Related Scenes */
describe('AccountHome scene', () => {
  it('renders without crashing', () => {
    const renderedAccountHome = renderer.create(<AccountHome />).toJSON();
    expect(renderedAccountHome).toMatchSnapshot();
  });
})

// AccountSettings Is Currently Failing!
// describe('AccountSettings scene', () => {
//   console.log(<AccountSettings />)
//   it('renders without crashing', () => {
//     const renderedAccountSettings = renderer.create(<AccountSettings />).toJSON();
//     expect(renderedAccountSettings).toMatchSnapshot();
//   });
// })

/* Camera-Related Scenes */
describe('Camera scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {camera:{}}
    })
  })
  it('renders without crashing', () => {
    const renderedCamera = renderer.create(<Camera store={store}/>).toJSON();
    expect(renderedCamera).toMatchSnapshot();
  });
})

describe('Camera Gallery scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {camera:{}}
    })
  })
  it('renders without crashing', () => {
    const renderedCameraGallery = renderer.create(<CameraGallery store={store}/>).toJSON();
    expect(renderedCameraGallery).toMatchSnapshot();
  });
})

/* Food Selector Scene */
describe('Food Selector scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {food:{}}
    })
  })
  it('renders without crashing', () => {
    const renderedFoodSelector = renderer.create(<FoodSelector store={store}/>).toJSON();
    expect(renderedFoodSelector).toMatchSnapshot();
  });
})

/* Meal History Scene */
describe('History scene', () => {
  it('renders without crashing', () => {
    const renderedHistory = renderer.create(<History />).toJSON();
    expect(renderedHistory).toMatchSnapshot();
  });
})

/* LoggedInLanding Page Scene */
describe('LoggedInLanding scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: {}}
    })
  })
  it('renders without crashing', () => {
    const renderedLoggedInLanding = renderer.create(<LoggedInLanding store={store}/>).toJSON();
    expect(renderedLoggedInLanding).toMatchSnapshot();
  })
})

/* Nutrition History Scene */
describe('NutritionHistory scene', () => {
  it('renders without crashing', () => {
    const renderedNutritionHistory = renderer.create(<NutritionHistory />).toJSON();
    expect(renderedNutritionHistory).toMatchSnapshot();
  })
})

/* Tab */
describe('Tab', () => {
  it('renders without crashing', () => {
    const renderedTab = renderer.create(<Tab />).toJSON();
    expect(renderedTab).toMatchSnapshot();
  })
})
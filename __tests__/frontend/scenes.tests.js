import React from 'react';
import AccountHome from '../../src/scenes/AccountHome';
import AccountSettings from '../../src/scenes/AccountSettings';
import Camera from '../../src/scenes/Camera';
import FoodSelector from '../../src/scenes/FoodSelector';
import History from '../../src/scenes/History';
import NutritionHistory from '../../src/scenes/NutritionHistory';
import SingleHistoryView from '../../src/scenes/SingleHistoryView';
import AccountManagement from '../../src/scenes/settings/AccountManagement';
import DietaryInfo from '../../src/scenes/settings/AccountManagement';
import UserInfo from '../../src/scenes/settings/AccountManagement';

import App from '../../App.js'

import renderer from 'react-test-renderer';
import { createStore } from 'redux';

/* Account-Related Scenes */
describe('AccountHome scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: { user: {}}, food: {}}
    })
  })
  it('renders without crashing', () => {
    const renderedAccountHome = renderer.create(<AccountHome store={store} />).toJSON();
    expect(renderedAccountHome).toMatchSnapshot();
  });
})

describe('AccountSettings scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: {
        user: {}
      }}
    })
  })
  it('renders without crashing', () => {
    const renderedAccountSettings = renderer.create(<AccountSettings store={store}/>).toJSON();
    expect(renderedAccountSettings).toMatchSnapshot();
  });
})

describe('AccountManagement scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: {
        user: {}
      }}
    })
  })
  it('renders correctly without crashing', () => {
    const renderedAccountManagement = renderer.create(<AccountManagement store={store}/>).toJSON();
    expect(renderedAccountManagement).toMatchSnapshot();
  });
})

describe('DietaryInfo scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: {
        user: {}
      }}
    })
  })
  it('renders correctly without crashing', () => {
    const renderedDietaryInfo = renderer.create(<DietaryInfo store={store}/>).toJSON();
    expect(renderedDietaryInfo).toMatchSnapshot();
  });
})

describe('UserInfo scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth: {
        user: {}
      }}
    })
  })
  it('renders correctly without crashing', () => {
    const renderedUserInfo = renderer.create(<UserInfo store={store}/>).toJSON();
    expect(renderedUserInfo).toMatchSnapshot();
  });
})

/* Camera-Related Scenes */
describe('Camera scene', () => {
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {auth:{ user: {}}}
    })
  })
  it('renders without crashing', () => {
    const renderedCamera = renderer.create(<Camera store={store}/>).toJSON();
    expect(renderedCamera).toMatchSnapshot();
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
  let store;
  beforeEach(() => {
    store = createStore(()=> {
      return {food:{}}
    })
  })
  it('renders without crashing', () => {
    const renderedHistory = renderer.create(<History store={store} />).toJSON();
    expect(renderedHistory).toMatchSnapshot();
  });
})

/* Nutrition History Scene */
describe('NutritionHistory scene', () => {
   let store;
    beforeEach(() => {
      store = createStore(()=> {
        return {food:{}}
      })
    })
  it('renders without crashing', () => {
    const renderedNutritionHistory = renderer.create(<NutritionHistory store={store}/>).toJSON();
    expect(renderedNutritionHistory).toMatchSnapshot();
  })
})

/* Single Meal History Scene */
describe('SingleHistoryView scene', () => {
   let store;
    beforeEach(() => {
      store = createStore(()=> {
        return {food:{}}
      })
    })
  it('renders without crashing', () => {
    const renderedSingleHistoryView = renderer.create(<SingleHistoryView store={store}/>).toJSON();
    expect(renderedSingleHistoryView).toMatchSnapshot();
  })
})
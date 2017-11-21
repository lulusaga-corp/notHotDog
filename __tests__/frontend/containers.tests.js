import React from 'react';
import requireAuth from '../../src/containers/auth/requireAuth';
import requireNotAuth from '../../src/containers/auth/requireNotAuth';
import Signup from '../../src/containers/auth/Signup';
import Signin from '../../src/containers/auth/Signin';
import LandingContainer from '../../src/containers/LandingContainer';

import renderer from 'react-test-renderer';

/* Auth Containers */
describe('requireAuth', () => {
  it('renders without crashing', () => {
    const renderedRequireAuth = renderer.create(<requireAuth />).toJSON();
    expect(renderedRequireAuth).toMatchSnapshot();
  })
})

describe('requireNotAuth', () => {
  it('renders without crashing', () => {
    const renderedRequireNotAuth = renderer.create(<requireNotAuth />).toJSON();
    expect(renderedRequireNotAuth).toMatchSnapshot();
  })

  it('renders signup component', () => {
    const renderedSignup = requireNotAuth(Signup);
    expect(renderedSignup).toMatchSnapshot();
  })

  it('renders signin component', () => {
    const renderedSignin = requireNotAuth(Signin);
    expect(renderedSignin).toMatchSnapshot();
  })
})

/* Landing Container */
describe('LandingContainer', () => {
  it('renders without crashing', () => {
    const renderedLandingContainer = renderer.create(<LandingContainer />).toJSON();
    expect(renderedLandingContainer).toMatchSnapshot();
  });
})
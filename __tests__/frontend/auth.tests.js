import React from 'react';
import requireAuth from '../../src/scenes/auth/requireAuth';
import requireNotAuth from '../../src/scenes/auth/requireNotAuth';
import Signup from '../../src/scenes/auth/Signup';
import Signin from '../../src/scenes/auth/Signin';

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
import * as auth from '../../src/modules/auth';

/* TESTING REDUCER */
describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth.default(undefined, {})).toEqual({
      error: '',
      loading: false,
      user: null,
    })
  })

  it('should begin loading on sign up request', () => {
    expect(auth.default(undefined, {type: auth.SIGN_UP_REQUEST})).toEqual({
      error: '',
      loading: true,
      user: null,
    })
  })

  it('should successfully sign up a user', () => {
    let bob = {
      email: 'bob@bob.com',
      password: 'bob234',
      firstname: 'Bob',
      lastname: 'Bobberson'
    }
    
    expect(auth.default(undefined, {type: auth.SIGN_UP_SUCCESS, payload: bob})).toEqual({
      error: '',
      loading: false,
      user: bob,
    })
  })

  it('should return an error if signup fails', () => {
    expect(auth.default(undefined, {type: auth.SIGN_UP_FAILURE, payload: 'Email address is already in use.'})).toEqual({
      error: 'Email address is already in use.',
      loading: false,
      user: null,
    })
  })

  it('should begin loading on signin request', () => {
    expect(auth.default(undefined, {type: auth.SIGN_IN_REQUEST})).toEqual({
      error: '',
      loading: true,
      user: null,
    })
  })

  it('should successfully sign in a user', () => {
    let joe = {
      email: 'joe@joe.com',
      password: '123joe',
      firstname: 'Joe',
      lastname: 'Joseph'
    }
    expect(auth.default(undefined, {type: auth.SIGN_IN_SUCCESS, payload: joe})).toEqual({
      error: '',
      loading: false,
      user: joe,
    })
  })

  it('should return an error if signin fails', () => {
    expect(auth.default(undefined, {type: auth.SIGN_IN_FAILURE, payload: 'Password is invalid.'})).toEqual({
      error: 'Password is invalid.',
      loading: false,
      user: null,
    })
  })

  it('should reset to initial state', () => {
    let tempState = {
      error: '',
      loading: false,
      user: {
        email: 'joe@joe.com',
        password: '123joe',
        firstname: 'Joe',
        lastname: 'Joseph'
      },
    }
    expect(auth.default(tempState, {type: auth.SET_INITIAL_STATE})).toEqual({
      error: '',
      loading: false,
      user: null
    })
  })

})
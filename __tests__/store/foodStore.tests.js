import * as food from '../../src/modules/food.js';

/* TESTING REDUCER */
describe('food reducer', () => {
  it('should return the initial state', () => {
    expect(food.default(undefined, {})).toEqual({
      foodArr: []
    })
  })

  it('should add foods to state', () => {
    let banana = ['banana', 'vegetable', 'sweet']
    expect(food.default(undefined, {type: food.GET_OPTIONS, payload: banana})).toEqual({
      foodArr: banana
    })
  })

})
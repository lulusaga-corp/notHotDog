import * as food from '../../src/store/food.js';

/* TESTING REDUCER */
describe('food reducer', () => {
  it('should return the initial state', () => {
    expect(food.default(undefined, {})).toEqual({
      monthMeals: [], 
      mostRecent: [], 
      todaysMeals: [], 
      weekMeals: []
    })
  })

  it('should add meals it recieves as input to state', () => {
    let meal1 = {meal: ['banana']};
    let meal2 = {meal: ['apple']};
    let meal3 = {meal: ['carrot']};
    let meal4 = {meal: ['potatoes']};
    let monthMeals = [meal1, meal2, meal3, meal4];
    let weekMeals = [meal1, meal2, meal3]
    let todaysMeals = [meal1, meal2]
    let mostRecent = [meal1]
    expect(food.default(undefined, {type: food.GET_ALL_USER_MEALS, payload: {
      monthMeals: monthMeals, 
      mostRecent: mostRecent, 
      todaysMeals: todaysMeals, 
      weekMeals: weekMeals
    }})).toEqual({
      monthMeals: [{meal: ['banana']}, {meal: ['apple']}, {meal: ['carrot']}, {meal: ['potatoes']}],
      mostRecent: [{meal: ['banana']}],
      todaysMeals: [{meal: ['banana']}, {meal: ['apple']}],
      weekMeals: [{meal: ['banana']}, {meal: ['apple']}, {meal: ['carrot']}]
    })
  })

})

const Dog = require('../Models/Dog.js');

describe('model class test', () => {
  it('creates a new doc', () => {
    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        //expect(dog.)
      });
  });
});
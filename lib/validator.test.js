const Validator = require('./validator.js');

const nameValidator = new Validator('name', { 
  type: String, 
  required: true 
});
const ageValidator = new Validator('age', {
  type: Number,
  required: true
});
const weightValidator = new Validator('weight', {
  type: String
});

const dog = {
  name: 'spot',
  age: '5',
  weight: '20 lbs'
};

describe('Class Validator Test', () => {
  it('validates name, age and weight', () => {
    const nameResult = nameValidator.validate(dog);
    expect(nameResult).toEqual('spot');

    const ageResult = ageValidator.validate(dog);
    expect(ageResult).toEqual(5);

    const weightResult = weightValidator.validate(dog);
    expect(weightResult).toEqual('20 lbs');
  });
  it('throws if value is not castable', () => {
    
    expect(() => nameValidator.validate({ noname: '', required: true })).toThrowErrorMatchingSnapshot();

    expect(() => ageValidator.validate({ name: 'spot', required: true })).toThrowErrorMatchingSnapshot();
  });
  it('doesnt throw error if not required', () => {
    const noWeightnoError = weightValidator.validate({
      name: 'weightless spot',
      age: '7'
    });
    expect(noWeightnoError).toEqual(null);
  });
}); 
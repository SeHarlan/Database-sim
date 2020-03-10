const {
  nameValidator,
  ageValidator,
  weightValidator
} = require('./validator.js');

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
    
    expect(() => nameValidator.validate({ noname: '' })).toThrowErrorMatchingSnapshot();

    expect(() => ageValidator.validate({ name: 'spot' })).toThrowErrorMatchingSnapshot();
  });
  it('doesnt throw error if not required', () => {
    const noWeightnoError = ageValidator.validate({
      name: 'weightless spot',
      age: '7'
    });
    expect(noWeightnoError).toEqual('');
  });
}); 
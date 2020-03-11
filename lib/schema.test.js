const Schema = require('./schema.js');

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String
  }
});

const spot = {
  name: 'spot',
  age: 5,
  weight: '20 lbs'
};

const rover = {
  name: 'rover',
  age: '10'
};

const who = {
  age: 'hi'
};

describe('schema validation', () => {
  it('returns valid schemas', () => {
    const expectSpot = dogSchema.validate(spot);
    expect(expectSpot).toEqual({ name: 'spot', age: 5, weight: '20 lbs' });

    const expectRover = dogSchema.validate(rover);
    expect(expectRover).toEqual({ name: 'rover', age: 10 });

    
  });
  it('throws error for invalid input', () => {
    const expectWhoError = dogSchema.validate(who);
    expect(expectWhoError).toThrowErrorMatchingSnapshot();
  });
});
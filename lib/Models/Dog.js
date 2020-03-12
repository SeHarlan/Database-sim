const Model = require('../model.js');
const Schema = require('../schema.js');

const dogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  weight: {
    type: String
  }
});

const Dog = new Model('Dog', dogSchema);

module.exports = Dog;
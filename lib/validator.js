const {
  isString,
  castToString,
  isNumber,
  castToNumber,
  getCaster,
} = require('./types.js');

class Validator {
  constructor(keyValue, validationObj) {
    this.keyValue = keyValue;
    this.validationObj = validationObj;
  }
  validate(obj) {
    //use key value to determine which type validator
    const caster = getCaster(this.validationObj.type);
    const required = this.validationObj.required;
    if (required) {
      return caster(obj[this.keyValue]);
    } else {
      return caster(obj[this.keyValue]) || '';
    }
  }
}

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
module.exports = {
  nameValidator,
  ageValidator,
  weightValidator
};
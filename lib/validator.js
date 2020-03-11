const {
  getCaster,
} = require('./types.js');

class Validator {
  constructor(field, config) {
    this.field = field;
    this.config = config;
  }
  validate(obj) {
    //use key value to determine which type validator
    if (this.config.required && !(this.field in obj)) {
      throw new Error(`Missing required field >>${this.field}<<`);
    }
    if (!this.config.required && !(this.field in obj)) return null;
    const caster = getCaster(this.config.type);
    return caster(obj[this.field]);
  }
}

module.exports = Validator;
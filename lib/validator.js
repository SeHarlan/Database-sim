const {
  getCaster,
} = require('./types.js');

class Validator {
  constructor(field, config) {
    this.field = field;
    this.config = config;
  }
  validate(obj) {
    const objField = obj[this.field];
    if (this.config.required && !(objField)) {
      throw new Error(`Missing required field >>${this.field}<<`);
    }
    if (!this.config.required && !(objField)) return null;
    
    const caster = getCaster(this.config.type);
    return caster(objField);
  }
}

module.exports = Validator;
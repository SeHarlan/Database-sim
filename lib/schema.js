const Validator = require('./validator.js');
class Schema {
  constructor(schemaDefinition) {
    this.schemaDefinition = schemaDefinition;
    this.validators = Object.entries(schemaDefinition).map(object => {
      return {
        name: object[0],
        func: new Validator(...object)
    });
  }
  getValidator(key) {
    return this.validators[key][1];
  }
  validate(obj) {
    return Object.entries(obj).map(item => {
      const validFunc = this.getValidator(item[0])
      return validFunc.validate(item[1])
    })
  }
}

module.exports = Schema;
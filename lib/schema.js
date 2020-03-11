const Validator = require('./validator.js');
class Schema {
  constructor(schemaDefinition) {
    this.schemaDefinition = schemaDefinition;
    this.validators = Object.entries(schemaDefinition).map(([field, config]) => {
      return new Validator(field, config);
    });
  }  
  validate(obj) {
    return this.validators.reduce((acc, item) => {
      acc[item.field] = item.validate(obj);
      return acc;
    }, {});
  }
}

module.exports = Schema;
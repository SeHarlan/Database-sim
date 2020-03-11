const Validator = require('./validator.js');
class Schema {
  constructor(schemaDefinition) {
    this.schemaDefinition = schemaDefinition;
    this.validators = Object.entries(schemaDefinition).map(([field, config]) => {
      return new Validator(field, config);
    });
  }  
  validate(obj) {
    const errors = [];
    const valid = this.validators.reduce((acc, item) => {
      try {
        acc[item.field] = item.validate(obj);
      } catch (e) {
        errors.push(`${item.field}: ${e}`);
      }
      return acc;
    }, {});
    if (errors.length > 1) throw new Error(`Invalid Schema input::: ${errors}`);
    return valid;
  }
}
module.exports = Schema;
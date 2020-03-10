const { isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean } = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('string'));
console.log(isBoolean(true));
console.log(isArray([]));
console.log(isObject({}));
console.log(isFunction(() => {}));
console.log(castToNumber('2'));
console.log(castToString(55));
console.log(castToBoolean('true'));

const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean
} = require('../lib/types.js');

describe('types validation module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('tells if value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(1)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });
    it('tells if value is a boolean', () => {
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
    });
    it('tells if value is an Array', () => {
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(1)).toBeFalsy();
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray(true)).toBeFalsy();
    });
    it('tells if value is an Object', () => {
      expect(isObject('hi')).toBeFalsy();
      expect(isObject(1)).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject({})).toBeTruthy();
    });
    it('tells if value is an Function', () => {
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction(1)).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
    });

  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });
    it('can cast values to string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString('string')).toEqual('string');
    });
    it('can cast values to Boolean', () => {
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean('true')).toEqual(true);
      expect(castToBoolean('false')).toEqual(false);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
    it('throws if value is not castable to string', () => {
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
    });
    it('throws if value is not castable to Boolean', () => {
      expect(() => castToBoolean([])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(66)).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean('2')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean('string')).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});

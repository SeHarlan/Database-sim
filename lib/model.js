const path = require('path');
const uuid = require('uuid/v4');
const {
  mkdirp,
  writeJSON,
  readDirJSON,
  readJSON,
  updateJSON,
  deleteFile
} = require('./file-system.js');

module.exports = class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    mkdirp(modelName);
  }
};
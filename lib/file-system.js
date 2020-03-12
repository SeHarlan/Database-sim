const fs = require('fs').promises;

function readJSON(path) {
  return fs.readFile(path)
    .then(results => JSON.parse(results))
    .catch(err => console.log('readJSON Error: ', err));
}
function writeJSON(path, data) {
  const stringyData = JSON.stringify(data);
  return fs.writeFile(path, stringyData)
    .then(() => data)
    .catch(err => console.log('writeJSON Error: ', err));
}
function readDirJSON(path) {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => {
        return readJSON(`${path}/${file}`);
      }));
    })
    .catch(err => console.log('readDirJSON Error: ', err));
}
function mkdirp(path) {
  return fs.mkdir(path, { recursive: true })
    .catch(err => console.log('mkdirp Error: ', err));
}
function deleteFile(path) {
  return fs.unlink(path)
    .catch(err => console.log('deleteFile Error: ', err));
}

function updateJSON(path, obj) {
  return readJSON(path)
    .then(json => {
      const updated = { ...json, ...obj };
      return writeJSON(path, updated);
    });
}


module.exports = {
  writeJSON, 
  readJSON, 
  readDirJSON, 
  updateJSON,
  mkdirp, 
  deleteFile 
};


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

//======================================
async function playAround() {
  // create the my-cool-directory
  // inside of that create child
  // inside of that create more
  await mkdirp('./my-cool-directory/child/more');

  // write an object to my-dog
  await writeJSON('./my-cool-directory/child/more/my-dog', {
    name: 'spot',
    age: 5,
    weight: '20 lbs'
  });

  // write two more dogs
  await Promise.all([
    writeJSON('./my-cool-directory/child/more/my-rover', {
      name: 'rover',
      age: 10,
      weight: '40 lbs'
    }),
    writeJSON('./my-cool-directory/child/more/my-bingo', {
      name: 'bingo',
      age: 2,
      weight: '100 lbs'
    })
  ]);

  let dog = await readJSON('./my-cool-directory/child/more/my-dog');

  // prints 5
  console.log('My dogs age', dog.age);

  const allDogs = await readDirJSON('./my-cool-directory/child/more');

  // prints 3
  console.log('all dogs array length', allDogs.length);
  //prints 'bingo'
  console.log('prints things dogs name, should be bingo: ', allDogs[2].name);

  // updates the dog saved at my-dog
  // does a merge or PATCH meaning that the name and weight
  // entries remain the same
  await updateJSON('./my-cool-directory/child/more/my-dog', {
    age: 6
  });

  dog = await readJSON('./my-cool-directory/child/more/my-dog');

  //prints 6
  console.log('my dogs new age', dog.age);

  // delete the dog file
  await deleteFile('./my-cool-directory/child/more/my-dog');

}
playAround();
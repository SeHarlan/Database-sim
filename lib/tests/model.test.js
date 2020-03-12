
const { deleteFile, readDirJSON } = require('../file-system.js');

let Dog;
describe('model class test', () => {
  beforeAll(() => {
    return Dog = require('../Models/Dog.js');
  });
  afterAll(() => {
    return readDirJSON('Dog')
      .then(dogFiles => dogFiles.forEach(dog => deleteFile(`Dog/${dog._id}`)));
  });
  it('creates a new doc', () => {
    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        expect(dog).toEqual({
          _id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
  it('finds by id and updates', () => {
    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        return Dog
          .findByIdAndUpdate(dog._id, {
            name: 'Jeff'
          });
      })
      .then(updateDog => {
        expect(updateDog).toEqual({
          _id: expect.any(String),
          name: 'Jeff',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
  it('find by id', () => {
    return Dog
      .create({
        name: 'spooot',
        age: 7,
        weight: '20 lbs'
      })
      .then(dog => {
        return Dog
          .findById(dog._id);
      })
      .then(foundDog => {
        expect(foundDog).toEqual({
          _id: expect.any(String),
          name: 'spooot',
          age: 7,
          weight: '20 lbs'
        });
      });
  });
  it('finds a folder and reads its content', () => {
    return Dog
      .create(
        {
          name: 'bob',
          age: 6,
          weight: '24 lbs'
        }
      )
      .then(() => {
        return Dog.find();
      })
      .then(foundDogs => {
        expect(foundDogs).toContainEqual(
          {
            name: 'bob',
            age: 6,
            weight: '24 lbs',
            _id: expect.any(String)
          }
        );
      });
  });

  it('finds by id and deletes', () => {
    return Dog
      .create({
        name: 'newSpot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        return Dog
          .findByIdAndDelete(dog._id);
      })
      .then(deleted => {
        expect(deleted).toEqual({
          _id: expect.any(String),
          name: 'newSpot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
});
const { 
  writeJSON, 
  readJSON, 
  readDirJSON, 
  updateJSON, 
  deleteFile,
  mkdirp 
} = require('../file-system.js');
const fs = require('fs').promises;


jest.mock('fs', () => {
  return {
    promises: {
      mkdir: jest.fn(() => Promise.resolve()),
      writeFile: jest.fn(() => Promise.resolve()),
      readFile: jest.fn(() => Promise.resolve('{"name":"spot"}')),
      readdir: jest.fn(() => Promise.resolve(['test.json', 'test2.json'])),
      unlink: jest.fn(() => Promise.resolve())
    }
  };
});
const dog = {
  name: 'spot',
  age: 5,
  weight: '20 lbs'
};
describe('Mock Crud Functions work', () => {
  it('reads json files', () => {
    return readJSON('./mockReadFile')
      .then(result => {
        expect(result).toEqual({ name: 'spot' });
        expect(fs.readFile).toHaveBeenCalledWith('./mockReadFile');
      });
  });
  it('writes json files', () => {
    return writeJSON('./mockWriteFile', dog)
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('./mockWriteFile', JSON.stringify(dog));
      });
  });
  it('reads all the files in a dir', () => {
    return readDirJSON('./mockDir')
      .then(result => {
        expect(fs.readdir)
          .toHaveBeenCalledWith('./mockDir');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./mockDir/test.json');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./mockDir/test2.json');
        expect(result).toEqual([
          { name: 'spot' },
          { name: 'spot' }
        ]);
      });
  });
  it('makes a file where directed', () => {
    return mkdirp('./a/path/we/made')
      .then(() => {
        expect(fs.mkdir)
          .toHaveBeenCalledWith('./a/path/we/made', { recursive: true });
      });
  });
  it('deletes a file from specified path', () => {
    return deleteFile('./fileToDelete')
      .then(() => {
        expect(fs.unlink).toHaveBeenCalledWith('./fileToDelete');
      });
  });
  it('updates a file', () => {
    return updateJSON('./fileToUpdate', { name: 'rover' })
      .then(result => {
        expect(fs.readFile)
          .toHaveBeenCalledWith('./fileToUpdate');
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./fileToUpdate', JSON.stringify({ name: 'rover' }));
        expect(result).toEqual({ name: 'rover' });
      });
  });

});
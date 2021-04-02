//import dotenv from 'dotenv';
import chokidar from 'chokidar';
//import mockFile from 'mock-fs';
import fse from 'fs-extra';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import dirTree from 'directory-tree';

// Self made module
import * as fileWatcher from '../src/fileWatcher';
import fileMetaData from '../src/fileMetaData';
import mock from 'mock-fs';

//dotenv.config();

// jest.mock('../src/fileMetaData', () => {
//     return jest.fn();
// });

let watcher: chokidar.FSWatcher;

beforeAll(() => {
    watcher = fileWatcher.startFileWatcher(<string>process.env.WATCHINGDIR);
    //mockFile.restore();
    //mocked(fileMetaData).mockClear();
});
// beforeEach(() => {
//     mockFile.restore();
//     mocked(fileMetaData).mockClear();
// });
// afterEach(() => {
//     mockFile.restore();
//     mocked(fileMetaData).mockClear();
// });
// afterAll(() => {
//     //watcher.close().then(() => console.log('watcher closed'));
//     jest.resetAllMocks();
//     mockFile.restore();
//     mocked(fileMetaData).mockClear();
// });

// Check if watcher is working fine
test('testing if return value is instance of chokidar', () => {
    expect(watcher).toBeInstanceOf(chokidar.FSWatcher);
});

// // Check if function newFileAdded() is being called
// test('check if function newFileAdded() is called', () => {
//     const spynewFileAdded = jest.spyOn(fileWatcher, 'newFileAdded');
//     spynewFileAdded.mockImplementation(() => console.log('newFileAdded() is called'));

//     watcher.emit('add', path.join(<string>process.env.WATCHINGDIR, 'fileName.txt'));

//     expect(spynewFileAdded).toBeCalled();

//     spynewFileAdded.mockRestore();
// });

// test('Testing the mocked fileMetaData()', () => {
//     mocked(fileMetaData).mockReturnValueOnce(true);

//     expect(mocked(fileMetaData('path'))).toBeTruthy();
// });

// test('check if FileAdded() function work correctly', () => {
//     // Mock file system
//     mockFile({
//         './watchedDir': mockFile.load('./watchedDir', { lazy: false }),
//     });

//     fse.ensureFileSync(path.join(<string>process.env.WATCHINGDIR));

//     mocked(fileMetaData).mockImplementation((): boolean => {
//         fse.ensureFileSync(path.join(<string>process.env.WATCHINGDIR, 'fileName', 'fileName.nfo'));
//         return true;
//     });

//     fileWatcher.newFileAdded('./watchedDir/fileName.txt');

//     // Get the mocked final destination directory items and console log it
//     const directoryTree = dirTree(path.join(<string>process.env.DOTROOM));
//     console.log(directoryTree);
// });

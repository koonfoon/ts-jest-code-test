import dotenv from 'dotenv';
import chokidar from 'chokidar';
import mockFile from 'mock-fs';
import fse from 'fs-extra';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import dirFree from 'directory-tree';

// Self made module
import * as fileWatcher from '../src/fileWatcher';
import fileMetaData from '../src/fileMetaData';

dotenv.config();

jest.mock('../src/fileMetaData', () => {
    return jest.fn();
});

let watcher: chokidar.FSWatcher;

beforeAll(() => {
    watcher = fileWatcher.startFileWatcher(<string>process.env.WATCHINGDIR);
    mockFile.restore();
    mocked(fileMetaData).mockClear();
});
beforeEach(() => {
    mocked(fileMetaData).mockClear();
});
afterEach(() => {});
afterAll(() => {});

// Check if watcher is working fine
test('testing if return value is instance of chokidar', () => {
    expect(watcher).toBeInstanceOf(chokidar.FSWatcher);
});

// Check if function newFileAdded() is being called
test('check if function newFileAdded() is called', () => {
    const spynewFileAdded = jest.spyOn(fileWatcher, 'newFileAdded');
    spynewFileAdded.mockImplementation(() => console.log('newFileAdded() is called'));

    watcher.emit('add', path.join(<string>process.env.WATCHINGDIR, 'file.txt'));

    expect(spynewFileAdded).toBeCalled();

    spynewFileAdded.mockRestore();
});

test('Testing the mocked fileMetaData()', () => {
    mocked(fileMetaData).mockReturnValueOnce(true);

    expect(mocked(fileMetaData('path'))).toBeTruthy();
});

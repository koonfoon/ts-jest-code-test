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
});
beforeEach(() => {});
afterEach(() => {});
afterAll(() => {});

// Check if watcher is working fine
test('testing if return value is instance of chokidar', () => {
    expect(watcher).toBeInstanceOf(chokidar.FSWatcher);
});

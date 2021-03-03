import dotenv from 'dotenv/config';
import * as fileWatcher from '../src/fileWatcher.ts';
import fileMetaData from '../src/fileMetaData.ts';
import chokidar from 'chokidar';
import mockFile from 'mock-fs';
import fse from 'fs-extra';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import dirFree from 'directory-tree';

dotenv.config();

jest.mock('../src/fileMetaData', () => {
    return jest.fn();
});

let watcher: chokidar.FSWatcher;

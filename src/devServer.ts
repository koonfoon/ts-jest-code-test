import { startFileWatcher } from './fileWatcher.js';

const watcher = startFileWatcher('./watchedDir');

if (watcher) {
    console.log('File watcher started.');
}

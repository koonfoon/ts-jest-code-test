import dotenv from 'dotenv';
import path from 'path';
import chokidar from 'chokidar';
import fse from 'fs-extra';
import moveFile from 'move-file';
import information from './fileMetaData.js';
import globby from 'globby';
import chalk from 'chalk';

dotenv.config();

export const startFileWatcher = (locationToWatch: string): chokidar.FSWatcher => {
    // Add event listener
    const watcher = chokidar.watch(locationToWatch, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true, // ignore initial directory and files
        awaitWriteFinish: true,
    });

    const log = console.log.bind(console);

    // If new file
    watcher.on('add', (newFileLocation) => {
        log(`File ${newFileLocation} has been added`);
        newFileAdded(newFileLocation);
    });

    return watcher;
};

export const newFileAdded = (newFileLocationAbsolute: string): void => {
    // Get the file name
    const newFileName = path.basename(newFileLocationAbsolute).split('.')[0];
    const newFileNameWithExtension = path.basename(newFileLocationAbsolute);

    // Determine the nested location/directory for the new file
    const nestedDir = path.join(<string>process.env.WATCHINGDIR, newFileName);
    const fileNameWithExtensionInNestedDir = path.join(nestedDir, newFileNameWithExtension);

    // determine the file final location
    const fileFinalDir = path.join(<string>process.env.FILEFINALDES, newFileName);

    try {
        const goodCreate = createDir(nestedDir);

        const goodMove = moveItem(newFileLocationAbsolute, fileNameWithExtensionInNestedDir);

        const goodInformation = information(fileNameWithExtensionInNestedDir);

        if (goodCreate && goodMove && goodInformation) {
            const goodFinalMove = moveItem(nestedDir, fileFinalDir);
            if (goodFinalMove) {
                console.log(`File ${newFileName} moved to ${fileFinalDir}`);
            }
        } else {
            console.log(`File ${newFileName} is not moving`);
        }
    } catch (err) {
        console.error(`${err}👧`);
    }
};

const createDir = (dirLocation: string): boolean | never => {
    fse.mkdirSync(dirLocation);
    // Check if the directory is created
    if (fse.pathExistsSync(dirLocation)) {
        console.log(`${dirLocation} was created`);
        return true;
    } else {
        return false;
    }
};

const moveItem = (source: string, destination: string): boolean => {
    moveFile.sync(source, destination);
    // Check if item move successfull
    if (fse.pathExistsSync(destination)) {
        console.log(`Item successfully moved to ${destination}`);
        return true;
    } else {
        return false;
    }
};

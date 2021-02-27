import dotenv from 'dotenv';
import path from 'path';
import chokidar from 'chokidar';
import fse from 'fs-extra';
import moveFile from 'move-file';
import information from './getTheGirlInfor.js';
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
        //TODO: Implement newFileAdded()
    });
};

export const newFileAdded = (newFileLocationAbsolute: string): void => {
    // Get the file name
    const newFileName = path.basename(newFileLocationAbsolute).split('.')[0];
    const bewFileNameWithExtension = path.basename(newFileLocationAbsolute);

    // determine the file final location
    const fileDir = path.join(<string>process.env.FILEFINALDES, newFileName);

    // TODO: create the new directory for the new file with the file name

    // TODO: move the new file to the newly created directory
};

const creaDir = (dirLocation: string): boolean | never => {
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

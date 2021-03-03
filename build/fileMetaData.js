import dotenv from 'dotenv';
import execa from 'execa';
import path from 'path';
dotenv.config();
export default (fileLocation) => {
    try {
        const javaMetaDataLocation = path.resolve('.', process.env.JAVAMETADATALOCATION);
        const fileLocationAbsolute = path.resolve('.', fileLocation);
        execa.sync('java', ['-jar', 'fileMetaData.jar', fileLocationAbsolute], {
            cwd: javaMetaDataLocation,
            stdio: 'inherit',
        });
        return true;
    }
    catch (err) {
        console.log(err.shortMessage);
        console.log('information getter crash😑');
        return false;
    }
};

import mockFile from 'mock-fs';

// Self made module
import fileMetaData from '../src/fileMetaData.ts';

beforeAll(() => {
    mockFile.restore();
});
beforeEach(() => {
    mockFile.restore();
});
afterEach(() => {
    mockFile.restore();
});
afterAll(() => {
    mockFile.restore();
});

test('crash the fileMetaData() function and test if return flase', () => {
    mockFile({
        './javaLib': {},
    });

    const crashedReturn = fileMetaData('crashYou');

    expect(crashedReturn).toBeFalsy();

    mockFile.restore();
});

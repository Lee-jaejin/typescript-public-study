import {writeCsvFakeData} from "../fake";
import {readFileGenerator} from "./read-file-generator";
import {deleteFile} from "./delete-file";
import {fileExists} from "./file-exists";


describe('파일 한줄씩 읽는 생성기, 구분자는 \\n', () => {
    const filename = 'data/test.csv';
    const numberOfData = 5;

    beforeAll(async () => {
        await fileExists(filename) && await deleteFile(filename);
        await writeCsvFakeData(filename, numberOfData);
    })

    it('한줄씩 읽어서 출력', () => {
        let count = 0;
        for (let line of readFileGenerator(filename)) {
            line && count++;
        }
        expect(count).toBe(numberOfData + 1);
    })

    afterAll(async () => {
        await deleteFile(filename);
    })
})
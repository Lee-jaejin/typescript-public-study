import {appendFile} from "./append-file";
import {writeFile} from "./write-file";
import {readFile} from "./read-file";
import {rmdir} from "./rmdir";


describe('파일 끝에 새로운 데이터 삽입', () => {
    const fileName = 'baz.txt';
    const fileData = 'hello world!';
    const appendFileData = '\nand there\'s more!';

    beforeEach(async () => {
        await writeFile(fileName, fileData);
    })

    it('존재하는 파일 끝에 데이터 삽입 후 삽입한 데이터 반환', async () => {
        await expect(appendFile(fileName, appendFileData)).resolves.toBe(appendFileData);
    })

    it ('데이터 삽입 후 추가된 데이터를 포함해서 확인', async () => {
        await appendFile(fileName, appendFileData);
        await expect(readFile(fileName)).resolves.toBe(fileData + appendFileData);
    })

    afterEach(async () => {
        await rmdir(fileName);
    })
})
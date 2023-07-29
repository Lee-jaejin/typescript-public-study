import {readFile} from "./read-file";
import {writeFile} from "./write-file";
import {rmdir} from "./rmdir";


describe('파일 읽기', function () {
    const fileName = 'bar.txt';
    const fileData = 'hello world!';

    beforeEach(async () => {
        await writeFile(fileName, fileData);
    })

    it('파일 읽기 성공하면 데이터 반환', async () => {
        await expect(readFile(fileName)).resolves.toBe(fileData);
    })

    it('파일 읽기 실패하면 throw Error', async () => {
        await expect(readFile('/root/' + fileName)).rejects.toThrowError();
    })

    afterEach(async () => {
        await rmdir(fileName);
    })
});
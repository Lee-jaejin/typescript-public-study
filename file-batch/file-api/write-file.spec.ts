import {writeFile} from "./write-file";
import {rmdir} from "./rmdir";


describe('파일 생성', function () {
    const fileName = 'foo.txt';
    const fileData = 'hello world!!';

    beforeEach(async () => {
        await rmdir(fileName);
    })

    it('파일 이름(경로)과 데이터로 파일 생성 후 데이터 반환', async () => {
        await expect(writeFile(fileName, fileData)).resolves.toBe(fileData);
    })

    it('파일 중복이면 생성 실패하고 메세지 반환', async () => {
        await writeFile(fileName, fileData);
        await expect(writeFile(fileName, fileData)).rejects.toThrowError('file already exists');
    })

    afterAll(async () => await rmdir(fileName))
});
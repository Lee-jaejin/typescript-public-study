import {mkdir} from "./mkdir";
import {rmdir} from "./rmdir";


describe('디렉토리가 비어있지 않더라도 삭제', () => {
    const testDirPath = 'rmdirTest/foo/bar';
    let removePath;

    beforeAll(async () => {
        removePath = await mkdir(testDirPath);
    })

    it('디렉토리 삭제 후 해당 디렉토리 반환', async () => {
        await expect(rmdir(removePath)).resolves.toBe(removePath);
    })

    it('디렉토리가 이미 지워진 상태면 입력값 반환', async () => {
        await expect(rmdir(removePath)).resolves.toBe(removePath);
    })
})
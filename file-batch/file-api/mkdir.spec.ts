import {mkdir} from "./mkdir";
import {rimraf} from "rimraf";

/** callback 테스트는 done 사용 */

describe('깊이 있는 디렉토리를 한번에 생성', () => {
    const testDirPath = 'recursiveDir/foo/bar';
    it('디렉토리 생성 후 생성된 첫 번째 디렉토리 이름까지의 절대 경로 반환', async () => {
        expect(await mkdir(testDirPath)).toBe(process.env.PWD + '/' + testDirPath.split('/')[0]);
    })

    it('디렉토리가 이미 있으면 입력 경로값 반환', async () => {
        // then 체인 사용할 경우, return 없이도 되긴 함..
        /*return mkdir(testDirPath).then(res => {
            expect(res).toBe(testDirPath);
        })*/

        // 간단하게
        await expect(mkdir(testDirPath)).resolves.toBe(testDirPath);
    })

    it('디렉토리 생성에 실패하여 throw 가 나오면 Error 반환', async() => {
        await expect(mkdir('/root' + testDirPath)).rejects.toThrowError();
    })

    afterAll(async () => rimraf(testDirPath.split('/')[0]))
})
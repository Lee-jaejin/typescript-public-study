import { mkdirp } from "mkdirp";
import { fileExists } from "./file-exists";
import { rimraf } from "rimraf";

describe('파일 존재여부 유틸 테스트', () => {
    const testDirPath = 'testDir';

    test('파일이 존재하면 true 반환', async () => {
        await mkdirp(testDirPath);
        expect(await fileExists(testDirPath)).toBe(true);
    })

    test('파일이나 디렉토리가 존재하지 않으면 false 반환', async () => {
        expect(await fileExists(testDirPath + 1)).toBe(false);
    })

    afterAll(async () => await rimraf(testDirPath))
})
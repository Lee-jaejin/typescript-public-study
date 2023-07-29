import {writeFile} from "./write-file";
import {rimraf} from "rimraf";
import {deleteFile} from "./delete-file";
import fs from "fs";
import fsPromises from 'fs/promises';
import {mkdir} from "./mkdir";


describe('파일 삭제', () => {
    const fileName = 'boo.txt';
    const fileData = 'delete file';

    beforeEach(async () => {
        await writeFile(fileName, fileData);
    })

    // it('파일 삭제 성공하면 파일 이름 반환', async () => {
    //     await expect(deleteFile(fileName)).resolves.toBe(fileName);
    // })
    //
    // it('파일이 이미 없는 경우에도 이름 반환', async () => {
    //     return deleteFile(fileName)
    //         .then(_ => deleteFile(fileName))
    //         .then((value) => expect(value).toBe(fileName));
    //     // await expect(deleteFile(fileName)).resolves.toBe(fileName);
    // })

    it('파일 삭제에 실패하면 throw Error', async () => {
        await mkdir('boo', 0o1400)
        .then(async _ => {
            await expect(deleteFile('boo')).rejects.toThrowError();
        })
    })

    afterEach(() => rimraf(fileName))
    afterAll(() => rimraf('boo'))
})
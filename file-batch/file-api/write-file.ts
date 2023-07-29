import fs from "fs";
import {fileExists} from "./file-exists";


export const writeFile = (filename: string, data: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        if (await fileExists(filename)) {
            reject(() => {
                throw new Error('file already exists')
            });
        }
        fs.writeFile(filename, data, 'utf8', (error: Error) => {
            !error ? resolve(data) : reject(() => {
                throw error
            });
        })
    })
}
import {fileExists} from "./file-exists";
import {rimraf} from "rimraf";


export const rmdir = (dirname: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        const alreadyExists = await fileExists(dirname);
        !alreadyExists ? resolve(dirname) : rimraf(dirname)
            .then(_ => resolve(dirname))
            .catch(reject);
    })
}
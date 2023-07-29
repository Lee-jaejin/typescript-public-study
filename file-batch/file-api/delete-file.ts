import {fileExists} from "./file-exists";
import fs from "fs";


export const deleteFile = (filename: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const alreadyExists = await fileExists(filename);
        console.log('alreadyExists?: ', alreadyExists);
        !alreadyExists ? resolve(filename) : fs.unlink(
            filename,
            (error: Error) => {
                console.log('error?? ', error)
                !error ? resolve(filename) : reject(() => {
                    throw error;
                })
            }
        );
    });
}
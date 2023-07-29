import fs from "fs";


export const readFile = (filename: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fs.readFile(filename, 'utf8', (error: Error, data: any) => {
            !error ? resolve(data) : reject(() => {
                throw error;
            });
        })
    });
}
import fs from "fs";


export const appendFile = (filename: string, data: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fs.appendFile(filename, data, 'utf8', (error: Error) => {
            !error ? resolve(data) : reject(() => {
                throw error;
            })
        })
    })
}
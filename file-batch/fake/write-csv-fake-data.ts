import path from "path";
import {appendFile, mkdir, writeFile} from "../file-api";
import {range} from "../utils";
import {IFake} from "./i-fake";
import {makeFakeData} from "./make-fake-data";


export const writeCsvFakeData = async (filename: string, numberOfItems: number): Promise<string> => {
    const dirname = path.dirname(filename);
    console.log('dirname: ', dirname);
    await mkdir(dirname);

    const comma = ',';
    const newLine = '\n';

    for (let n of range(numberOfItems)) {
        const fake: IFake = makeFakeData();
        if (n == 0) {
            const keys = Object.keys(fake).join(comma);
            await writeFile(filename, keys);
        }
        const values = Object.values(fake).join(comma);
        await appendFile(filename, newLine + values);
    }

    return `done writing ${numberOfItems} items to ${filename} file.`;
}
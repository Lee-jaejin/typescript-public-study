import {mkdirp} from "mkdirp";
import {fileExists} from "./file-exists";

export const mkdir = (dirname: string, mode = 0o777): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        const alreadyExists = await fileExists(dirname);
        // mkdirp 는 첫 번째로 만들어진 디렉토리 이름까지의 절대경로를 반환
        // 만들어진게 없으면 undefined 반환하지만 fileExists 로 위에서 확인했기 때문에 나올 수 없음
        alreadyExists ? resolve(dirname) : mkdirp(dirname, { mode })
            .then((value: string) => resolve(value))
            .catch(reject);
    })
}
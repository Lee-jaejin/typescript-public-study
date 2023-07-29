import fs from 'fs';


export function* readFileGenerator(filename: string): any {
    let fileDescriptor: any;

    try {
        fileDescriptor = fs.openSync(filename, 'rs');
        const stats = fs.fstatSync(fileDescriptor);

        console.log("Path is file: ", stats.isFile());
        console.log("Path is directory: ", stats.isDirectory());

        const bufferSize = Math.min(stats.size, 128);
        const buffer = Buffer.alloc(bufferSize);
        let filePosition = 0;
        let line: string;

        while (filePosition > -1) {
            // console.log(`filePosition before readLine: ${filePosition}`);
            // 마지막 라인 전에는 filePosition 이 양수
            // readLine 이 마지막 라인을 읽으면 filePosition = -1 반환,
            [line, filePosition] = readLine(
                fileDescriptor,
                buffer,
                bufferSize,
                filePosition
            );
            // console.log(`filePosition after readLine: ${filePosition}`);
            // 아래는 실행하지 않고 루프 탈출
            if (filePosition > -1) {
                yield line; // next 호출될 때 마다 이 지점부터 다시 실행
                // 여기서 마지막 라인 전까지는 filePosition 이 양수이므로 다음 루프 실행
            }
        }
        yield line; // last line
    } catch (e) {
        console.error('readline: ', e);
    } finally {
        if (fileDescriptor) fs.closeSync(fileDescriptor);
        // fileDescriptor && fs.closeSync(fileDescriptor); // same
    }
}

function readLine(fd: any, buffer: Buffer, bufferSize: number, position: number): [string, number] {
    let line = '';
    let readSize;

    // console.log(`buf.toString max size: ${(require('buffer').constants.MAX_STRING_LENGTH + 1) / 2**31} GB`);
    const crSize = '\n'.length;

    while (true) {
        readSize = fs.readSync(fd, buffer, 0, bufferSize, position);
        if (readSize > 0) {
            const temp = buffer.toString('utf8', 0, readSize);
            const index = temp.indexOf('\n');
            if (index > -1) {
                line += temp.substring(0, index);
                position += index + crSize;
                break;
            } else {
                line += temp;
                position += temp.length;
            }
        } else {
            position = -1;
            break;
        }
    }

    return [line.trim(), position];
}
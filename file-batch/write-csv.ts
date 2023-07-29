import {getFileNameAndNumber} from "./utils";
import {writeCsvFakeData} from "./fake";

const [filename2, numberOfFakeData2] = getFileNameAndNumber('./data/fake', 100000);
const csvFilename = `${filename2}-${numberOfFakeData2}.csv`;

writeCsvFakeData(csvFilename, numberOfFakeData2)
.then(result => console.log(result))
.catch((e: Error) => console.log(e.message));
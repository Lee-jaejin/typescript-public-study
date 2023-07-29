import {makeFakeData} from "../fake";
import {zip} from "./";


describe('key 배열과 value 배열을 합쳐 객체 만들기', () => {
    let data;
    let keys, values;

    beforeEach(() => {
        data = makeFakeData();
        keys = Object.keys(data);
        values = Object.values(data);
    })

    it('합친 값이 객체이어야 함', () => {
        expect(zip(keys, values)).toStrictEqual(data);
    })
})
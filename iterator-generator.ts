/**
 * iterator
 */
export class RangeIterable {
    constructor(public from: number, public to: number) {}

    [Symbol.iterator]() {
        const that = this;
        let currentValue = that.from;
        return {
            next() {
                const value = currentValue <= that.to ? currentValue++ : undefined;
                const done = value == undefined;
                return { value, done };
            }
        }
    }
}

const r = new RangeIterable(1, 3);
for (let i of r) {
    console.log(i);
}

export class StringIterable<T> implements Iterable<T> {
    constructor(private values: T[], private currentIndex: number = 0) {
    }

    [Symbol.iterator](): Iterator<T> {
        const that = this;
        let currentIndex = that.currentIndex;
        let length = that.values.length;

        const iterator: Iterator<T> = {
            next(): { value: any, done: boolean } {
                const value = currentIndex < length ? that.values[currentIndex++] : undefined;
                const done = value == undefined;
                return { value, done };
            }
        }
        return iterator;
    }
}

for (let v of new StringIterable(['hello', 'world', '!'])) {
    console.log(v);
}

/**
 * generator
 */

export function* generator() {
    console.log('generator start');

    let value: number = 1;
    while(value < 4) {
        yield value++;
    }

    console.log('generator end');
}

for (let v of generator()) {
    console.log(v);
}


function* rangeGenerator(from: number, to: number) {
    let value: number = from;
    while (value <= to) {
        yield value++;
    }
}

console.log('rangeGenerator()');
let iterator = rangeGenerator(1, 3);
while (1) {
    const { value, done } = iterator.next()
    if (done) break;
    console.log(value);
}

for (let value of iterator) {
    console.log(value);
}

class IterableUsingGenerator<T> implements Iterable<T> {
    constructor(private values: T[] = [], private currentIndex: number = 0) {}

    [Symbol.iterator] = function* () {
        // @ts-ignore
        while (this.currentIndex < this.values.length) {
            // @ts-ignore
            yield this.values[this.currentIndex++];
        }
    }
}

console.log('IterableUsingGenerator');
for (let item of new IterableUsingGenerator([1,2,3])) {
    console.log(item);
}

for (let item of new IterableUsingGenerator(['hello', 'world', '!'])) {
    console.log(item);
}

function* gen12() {
    yield 1;
    yield 2;
}

function* gen12345() {
    yield* gen12()
    yield* [3, 4];
    yield 5;
}

console.log('gen12345');
for (let value of gen12345()) {
    console.log(value);
}

function* gen() {
    let count: number = 5;
    let select: number = 0;
    while(count--) {
        select = yield `you selected ${select}`;
    }
}

const random = (max: number, min: number = 0) => Math.round(Math.random() * (max - min)) + min;

const iter = gen();
while (true) {
    const {value, done} = iter.next(random(10, 1));
    if (done) break;
    console.log(value);
}
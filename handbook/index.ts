export {}

// declare function create(o: Object | null): void;
//
// create({ prop: 0 }); // 성공
// create(null); // 성공
//
// create(42); // 오류
// create("string"); // 오류
// create(false); // 오류
// create(undefined); // 오류
// create({});

interface SquareConfig {
    color?: string;
    width?: number;

    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

// let mySquare = createSquare({color: "black"});

// 변수는 const, 프로퍼티는 readonly 사용

// let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);

// let mySquare = createSquare({ width: 100, opacity: 0.5 });

let squareOptions = {colour: "red"};
let mySquare = createSquare(squareOptions);


interface SearchFunc {
    (source: string, substring: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (sub: string): boolean {
    // let result = src.search(sub);
    return 0 > -1;
}

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"]; // index: number
// myArray = {
//     test: '1',
//     teste2: 'test2'
// } // index: string

let myStr: string = myArray[0];
console.log(myStr)

class Animal {
    name: string = "";
}

class Dog extends Animal {
    breed: string = "";
}

// 뉴메릭 인덱서의 반환 자료형이 스트링 인덱서의 반환 자료형에 할당 가능해야 함
interface NotOkay {
    // [x: number]: Animal;
    [x: string]: Dog;
}

interface Okay {
    [x: number]: Dog;
    [x: string]: Animal;
}

class testClass1 {
    private testValue: string = "";
}

interface IsPossible extends testClass1 {
    testValue2: string;
}

interface Foo {
    [index: string]: boolean;
    // foo: object;
}

// JS 에서만 가능
// let obj = {
//     toString(){
//         console.log('toString called')
//         return 'Hello'
//     }
// }
//
// let foo: any = {};
// foo[obj] = 'World'; // toString called
// console.log(foo[obj]); // toString called, World
// console.log(foo['Hello']); // World

interface CanHaveSameName {
    nameProp: string;
}

interface CanHaveSameName {
    titleProp: string;
}

interface objCount {
    counter: 0;
}

const obj: objCount = {
    counter: 0
};

// obj.counter = 1;


let sym1 = Symbol('key');
let sym2 = Symbol('key');

if (sym1 === sym2) {
    console.log('test')
} else {
    console.log(sym1, sym2)
}

// Symbol 은 인자를 설명으로 가지는 심볼을 생성한다
const unsharedSym = Symbol('foo');
const symKey1 = Symbol.keyFor(unsharedSym);
console.log(symKey1);

// Symbol.for 은 전달받은 키를 가지는 심볼을 전역 심볼 레지스트리에 등록한다
// keyFor 은 전달받은 심볼을 전역 심볼 레지스트리에서 찾는다
const sharedSym = Symbol.for('foo');
const symKey2 = Symbol.keyFor(sharedSym);
console.log(symKey2); // undefined

// for ...in 문법에서 키가 심볼인 프로퍼티들은 열거되지 않는다.
const obj2: any = {};

obj2[Symbol('a')] = 'a';
obj2[Symbol.for('b')] = 'b';
obj2['c'] = 'c';
obj2.d = 'd';

for (const propertyKey in obj2) {
    console.log(propertyKey);
}

console.log(obj2);
console.log(Symbol.keyFor(Symbol.for('b')))
// console.log(Symbol.keyFor(obj2[2]))

const arr1 = [1, 4, 7];
const obj3 = {
    test1: 'test1 value',
    test2: 'test2 value',
    test3: 'test3 value'
}
const obj4 = [
    {
        test1: 'test1 key1',
        value1: 'test1 value1'
    },
    {
        test2: 'test1 key2',
        value2: 'test1 value2'
    },
    {
        test3: 'test1 key3',
        value3: 'test1 value3'
    }
]
const arrEntries = obj4.entries();

console.log(arrEntries.toString());
console.log(arrEntries);
console.log(arrEntries === arrEntries[Symbol.iterator]());

for (const el of arrEntries) {
    console.log(el);
}

const genObject = function* () {
    yield 1;
    yield 2;
    yield 3;
}();

console.log(typeof genObject[Symbol.iterator]);
console.log(genObject[Symbol.iterator]());

console.log(typeof genObject.next);

console.log(genObject[Symbol.iterator]() === genObject);

const arr2 = [2, 4, 6];

for (const e of arr2) console.log(e);

const iterator = arr2[Symbol.iterator]();
console.log(iterator);

while (true) {
    const data = iterator.next();
    if (data.done) break;
    else console.log(data.value);
}

const objArray = [
    {test1: 'value1'},
    {test2: 'value2'},
    {test3: 'value3'},
]

const obj5 = {
    test1: 'value1',
    test2: 'value2',
    test3: 'value3'
}
console.log([...objArray], 'spread operator also iterable object user');

function* gen () {
    yield* ['a', 'b', 'c'];
}


/** iterator 만들어 보기
/ 1. iterable 객체와(여기서 변수 range)
/    iterator 객체가(여기서 range[Symbol.iterator]) 서로 다른 경우
*/
/*
const range = {
    from: 1,
    to: 5
};

// Symbol.iterator 메소드 정의 (iterable 객체의 조건)
range[Symbol.iterator] = function () {
    // iterator 객체를 반환
    return {
        current: this.from,
        last: this.to,

        // next() 메소드 정의 (iterator 객체의 조건)
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true, value: undefined };
            }
        }
    };
};

// @ts-ignore
for (const num of range) {
    console.log(num);
}

 */

/** iterator 만들어 보기
 / 1. iterable 객체와(여기서 변수 range)
 /    iterator 객체가(여기서 range[Symbol.iterator]) 서로 다른 경우
 */
// 이 경우엔 하나의 iterable 객체에 대하여 두 개의 for ... of 문법을 동시에 사용할 수 없다
// 한 객체에 저장되어 있는 상태 값을 공유하기 때문
const range = {
    from: 1,
    to: 5,

    // iterable 객체의 조건
    // - 이름이 Symbol.iterator 인 메소드를 정의해야 한다 (혹은 상위 프로토타입 체인에서 상속받아야 한다)
    // - 해당 메소드는 인자가 없으며, iterator 객체를 반환해야 한다
    current: 0,
    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    // iterator 객체의 조건
    // - next() 메소드를 정의해야 한다 (혹은 상위 프로토타입 체인에서 상속받아야 한다)
    // - 해당 메소드는 인자가 없으며, done 프로퍼티와 value 프로퍼티를 가지는 객체를 반환해야 한다
    // - done 프로퍼티: 반복이 끝났다면 true, 아니라면 false (혹은 done 프로퍼티를 정의하지 않음) 이다
    // - value 프로퍼티: 반복이 끝났다면 undefined (혹은 value 프로퍼티를 정의하지 않음), 아니라면 현재 위치의 요소 값이다
    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true, value: undefined };
        }
    },

    // return () {
    //     this.current = this.to + 1;
    //     return { done: true, value: undefined };
    // },
    //
    // throw (error) {
    //     throw error;
    // },

    currentValue() {
        return this.current;
    }
};

async function test1(label: string) {
    for (const num of range) {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(range.current, 'current 1');
        for (const num2 of range) {
            // num2 가 range.currentValue() 가 2인데도 여기에서 1로 나온 이유는
            // range 의 [Symbol.iterator]() 를 정의할 때, this.current 를 this.from 으로 했기 때문
            // this.from 은 항상 1 부터 시작이므로 안쪽 반복이 5번 될 수 있었다.
            console.log(num, num2, range.currentValue(), 'current 2')
            // console.count(label)
            console.log(num, num2, 'test');
        }
    }
}

async function syncTest () {
    console.log('test')
    // await Promise.all([test1('test1'), test1('test2'), test1('test3')])
}

test1('test1')

// 유사 배열 객체
// - 숫자 값을 가지는 length 프로퍼티를 가지고 있다
// - 숫자 값 기반의 인덱싱이 가능해야 한다
// 예시
const arrLikeObject = {
    0: 'IT',
    1: 'Eldorado',
    length: 2
};

// iterable 객체가 아니므로 에러 발생
// for (const e of arrLikeObject) console.log(e);

// Array.from() 메소드
// - iterable 객체 혹은 유사 배열 객체를 진짜 배열로 변환시켜주는 메소드

const iterable1 = 'foo';
console.log(iterable1);
console.log(Array.from(iterable1));

const iterable2 = new Set(['foo', 'bar', 'baz', 'foo']);
console.log(iterable2);
console.log(Array.from(iterable2));

const iterable3 = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(iterable3);
console.log(Array.from(iterable3));

const mapper = new Map([['1', 'a'], ['2', 'b']]);

const iterable4 = mapper.keys();
console.log(iterable4);
console.log(Array.from(iterable4));

const iterable5 = mapper.values();
console.log(iterable5);
console.log(Array.from(iterable5));

const iterable6 = mapper.entries();
console.log(iterable6);
console.log(Array.from(iterable6));

console.log(mapper.set('1', 'c'))

const iterable7 = 'foo';
console.log(Array.from(iterable7, x => x + x));

const iterable8 = new Set(['foo', 'bar', 'baz', 'foo']);
console.log(Array.from(iterable8, x => x[0]));

const sym = Symbol();

let obj6 = {
    [sym]: 'value'
};

console.log(obj6[sym]);

console.log(mapper[Symbol.iterator]())

const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol]() {
        return 'C';
    }
}

let c = new C();
let className = c[getClassNameSymbol]();
console.log(className)

// 생성자가 객체를 생성자의 인스턴스 중 하나로 인식하는지 확인하는 메서드, instanceof 연산자로 호출됨
Symbol.hasInstance
// 객체가 자신의 배열 요소를 Array.prototype.concat 를 사용하여 직렬화할 수 있는지 나타내는 boolean 값
Symbol.isConcatSpreadable
// 객체의 기본 반복자를 반환하는 메서도. for-of 문으로 호출됨
Symbol.iterator
// 정규 표현식과 문자열을 비교하는 정규 표현식 메서드. String.prototype.match 메서드로 호출됨
Symbol.match
// 문자열에서 일치하는 부분 문자열을 치환하는 정규 표현식 메서드. String.prototype.replace 메서드로 호출됨
Symbol.replace
// 정규 표현식과 매치되는 문자열의 인덱스를 반환하는 정규 표현식 메서드. String.prototype.search 메서드로 호출됨
Symbol.search
// 파생된 객체를 생성하는데 사용하는 생성자 함수의 중요한 속성
Symbol.species
// 정규 표현식과 매치되는 인덱스들에 위치한 문자열을 나누는 정규 표현식 메서드. String.prototype.split 메서드로 호출됩니다
Symbol.split
// 객체를 대응되는 기본 값으로 변환하는 메서드. ToPrimitive 추상 연산으로 호출됩니다
Symbol.toPrimitive
// 객체의 기본 문자열 형식을 만드는데 사용되는 문자열 값. 내장 메서드인 Object.prototype.toString 으로 호출됩니다.
Symbol.toStringTag
// 자신의 프로퍼티 이름이 연결된 개체의 'with' 환경 바인딩에서 제외되는 프로퍼티 이름인 객체
Symbol.unscopables

type EnumLike = 'coffee' | 'tee' | 'water';
interface typedInterface {
    name: string;
    likeBeverage: EnumLike;
}

const cafeOrder = (likeBeverage: EnumLike) => {
    return likeBeverage;
}

const coffeeMan = {
    name: 'kal',
    likeBeverage: 'coffee'
}

console.log(cafeOrder('coffee'), 'test');

function padLeft(padding: number | string, input: string): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}

padLeft(1, 'test')

function printAll(strs: string | string[] | null | undefined) {
    // null 과 undefined 는 걸러지며, "" (empty string) 은 안으로 진행됨
    if (strs != undefined) {
        if (typeof strs === "object") {
            // checks if "strictNullChecks": true
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === "string") {
            console.log(strs);
        }
    } else {
        console.log('null | undefined found');
    }
}

const error = {
    test: new Map()
};
printAll(undefined)

// javascript coerce to false
/**
 * 0
 * NaN
 * ""
 * 0n
 * null
 * undefined
 */

type Fish = { name: string, swim: () => void };
type Bird = { name: string, fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
    if ("swim" in animal && animal.swim) {
        return animal.swim();
    } else if ("fly" in animal && animal.fly) {
        return animal.fly();
    }
    return 'just walk';
}

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }
}

let x = Math.random() < 0.5 ? 10 : "hello world!";

x = 1;

console.log(x);

x = "goodbye!";
console.log(x);

// x = true; // error


// control flow analysis
function padLeft2(padding: number | string, input: string) {
    if (typeof padding === "number") {
        // padding: number
        return " ".repeat(padding) + input;
    }
    // padding: number code unreachable
    // padding: string
    return padding + input;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

const fish = {
    swim: () => { return; }
}

const bird = {
    name: 'bird',
    fly: () => { return; }
}
console.log(isFish(bird));


function getSmallPet(name: string): Fish | Bird {
    return {
        name: name,
        swim: () => {return;},
        fly: () => {return;}
    }
}
// Both calls to 'swim' and 'fly' are now okay
let pet = getSmallPet('dolphin');

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet('penguin'), getSmallPet('sharkey'), getSmallPet('pigeon')];
const underWater1: Fish[] = zoo.filter(isFish);
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return false;
    return isFish(pet);
})

/**
 * `this` Types
 */
class Box1 {
    contents: string = "";
    set(value: string) {
        this.contents = value;
        return this;
    }
}

class ClearableBox extends Box1 {
    clear() {
        this.contents = "";
    }
}

const a = new ClearableBox();
const b = a.set("hello");

/**
 * Type Guard
 */


class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
        return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
        return this.networked;
    }

    constructor(public path: string, private networked: boolean) {
    }
}

class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}

class Directory extends FileSystemObject {
    children: FileSystemObject[];
}

interface Networked {
    host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
    fso.content;
} else if (fso.isDirectory()) {
    fso.children;
} else if (fso.isNetworked()) {
    fso.host;
}

class Box<T> {
    value?: T;

    hasValue(): this is { value: T } {
        return this.value !== undefined;
    }
}

const box = new Box();
box.value = "GameBoy";

box.value;

if (box.hasValue()) {
    box.value;
}

/**
 * Parameter Properties
 * 파라미터 프로퍼티
 * 생성자의 파라미터는 클래스의 프로퍼티로 사용할 수 있다.
 * 클래스 프로퍼티와 마찬가지로, 접근 제어자를 통해 선언할 수 있다.
 */
class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ) {
    }
}
const d = new Params(1, 2, 3);
console.log(d.x);
// console.log(d.y);

/**
 * Class Expressions
 * 클래스 표현식
 * 일반 클래스와 다른 점은 이름이 필요없다는 것이다.
 * 다만, 바인딩된 변수를 통해 접근할 수 있다.
 */
const someClass = class<Type> {
    constructor(content: Type) {
    }
}

const m = new someClass("Hello, world");

/**
 * abstract Classes and Members
 * 추상 클래스와 멤버
 * 추상 클래스로 선언된 클래스는 인스턴스화 될 수 없다
 * 인스턴스화는 추상 클래스를 상속받은 파생 클래스로만 가능하다
 * 파생 클래스는 상속받은 추상 클래스의 추상 멤버에 대해 구현체를 정의해야 한다.
 * 아무런 추상 클래스가 없는 경우에 이를 concrete 하다고 한다.
 */
abstract class Base {
    abstract getName(): string;

    protected printName() {
        console.log("Hello, " + this.getName());
    }
}

// Cannot create an instance of an abstract class.
// const b = new Base();

class Derived extends Base {
    getName(): string {
        return "JaeJin";
    }

    printProtectedName() {
        super.printName();
        console.log("This name is protected: " + this.getName());
    }
}

const e = new Derived();
// e.printName();
e.printProtectedName();

function greet(ctor: new () => Base) {
    const instance = new ctor();
    const name = instance.getName();
    console.log("Greeting, " + name);
}

greet(Derived);
// greet(Base); // error

/**
 * Relationships Between Classes
 * 클래스들 사이의 관계
 */
/*
 두 클래스가 동일하기 때문에 대체되어 사용될 수 있다.
 */
class Point1 {
    x = 0;
    y = 0;
}

class Point2 {
    x = 0;
    y = 0;
}

// OK
const p: Point1 = new Point2();

/*
 비슷하게, 명백한 상속이 없으면 서브타입 관계의 클래스도 사용 가능하다.
 */
class Person {
    name: string;
    age: number;
}

class Employee {
    name: string;
    age: number;
    salary: number;
}

// OK
const p2: Person = new Employee();

// 만약, 빈 클래스가 있다면 어느곳에도 사용 가능해지기 때문에 절대 사용하지 마라.
class Empty {}

function fn(x: Empty) {
    // x 로 할 수 있는게 아무것도 없으니 쓰지 마세요.
}

// 전부 가능해져버림
fn(window);
fn({});
fn(fn);


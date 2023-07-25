export {}

// type MappedTypeWithNewProperties<Type> = {
//     [Properties in keyof Type as NewKeyType]: Type[Properties];
// }

type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
}

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;

// union 을 in 을 써서 loop 돌릴 수 있다.
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
/* type Config = {
 *     square: (event: SquareEvent) => void;
 *     circle: (event: CircleEvent) => void;
 * }
 */

type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
}

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
/* type ObjectsNeedingGDPRDeletion = {
 *     id: false;
 *     name: true;
 * }
 */

/**
 * Readonly
 * 읽기 전용
 * 읽기 전용이지만 해당 프로퍼티의 내부 내용은 바꿀 수 있음
 * 해당 프로퍼티에 readonly 선언이 있는 것만 수정 불가능
 *
 */

interface Home {
    readonly resident: { name: string; age: number; };
}

function visitForBirthday(home: Home) {
    // resident 내부의 프로퍼티는 수정 가능
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
}

function evict(home: Home) {
    // 이건 안됨 - resident 가 readonly 이기 때문에
    // home.resident = {
    //     name: "Victor the Evictor",
    //     age: 42,
    // }
}

interface Person1 {
    name: string;
    age: number;
}

type ReadonlyPerson = {
    +readonly [Property in keyof Person1]: Person1[Property];
}

let writablePerson: Person1 = {
    name: "Person McPersonface",
    age: 42,
};

let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);

/**
 * Index Signatures
 */
/*
declare function getStringArray(): StringArray;

interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

 */
/*
interface NumberDictionary {
    [index: string]: number;

    length: number;
    name: string; // TS2411: Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

 */

interface NumberOrStringDictionary {
    [index: number]: string | number;
    length: number;
    name: string;
}

/**
 * Excess Property Checks
 * 초과 프로퍼티 확인
 */
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {
    color: string;
    area: number;
} {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20
    };
}

// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'
// let mySquare = createSquare({ colour: "red", width: 100 });

// 이건 됨 (type assertion 이라고 함)
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);

// 더 좋은 방법
// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }

// 다른 변수에 할당하는것도 에러안남 (프로퍼티 이름이 맞는게 하나라도 있을 경우)
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);

// 하지만 프로퍼티 이름이 맞는게 하나도 없을 경우 다른 변수에 할당해도 에러
let squareOptions2 = { colour: "red" };
// TS2559: Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.
// let mySquare3 = createSquare(squareOptions2);

// 하지만 대부분의 경우 초과 프로퍼티 확인에서 나오는 오류는 실제로 버그로 이어질 가능성이 크다
// type assertion 이나 다른 변수에 할당 등의 회피기법을 사용하는 것 보다는
// 실제로 해당 타입에 대해서 정확하게 처리를 해주는게 더 좋다

/**
 * Extending Types
 * 타입 확장
 */
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
    unit: string;
}

interface Colorful {
    color: string;
}

interface Circle2 {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle2 {}

// @@@@ 왜 narrowing 에 있는 Circle 이 여기에 들어오지?
const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};

// extends 는 조합하면 정확하게 내부의 프로퍼티들과 일치하는 구조를 찾으려 하고
// & (intersection) 을 사용하면 내부의 프로퍼티들 마다 검사하는 듯
// 에러는 extends 는 타입에 대해서 할당할 수 없다하고
// & 는 타입의 argument 에 대해서 맞지 않는다고 나옴

/**
 * Generic Object Types
 */
interface Box2 {
    contents: unknown;
}

let x: Box2 = {
    contents: "hello world",
};

// 조건 검사를 시행하거나
if (typeof x.contents === "string") {
    console.log(x.contents.toLowerCase());
}

// type assertion 을 이용하면 됨
console.log((x.contents as string).toLowerCase());

// 이 인터페이스는
interface Box3<Type> {
    contents: Type;
}

// 이 type alias 로 쓸 수 있고,
type Box4<Type> = {
    contents: Type;
}

// interface 와 다르게 type alias 는 다양한 종류의 제네릭 헬퍼 타입을 만들 수 있다
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

/**
 * The Array Type
 * 배열도 마찬가지로 제네릭 타입이다
 *
 * ReadonlyArray
 * 읽기전용 배열
 */
// ReadonlyArray<string> 은 readonly string[] 과 같다
function doStuff(values: readonly string[]) {
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // values.push("hello!"); // error
}

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

let x1: readonly string[] = ['1', '2', '3'];
let y1: string[] = ['1', '2'];

x1 = y1;
// x1 이 readonly 이기 때문에 변형 가능한 타입을 가진 변수 y1 에 할당할 수 없다.
// y1 = x1;
console.log(x1, y1);

// @@@ readonly 수정자와 다르게 Array 와 ReadonlyArray 의 할당 가능성은 양방향일 수 없다
let x2: Array<number> = [1, 2];
let y2: ReadonlyArray<number> = [1, 2, 3];
// x2 = y2;
y2 = x2;
console.log(x2, y2);

/**
 * Tuple Types
 * 튜플 타입
 * 튜플 타입은 매우 견고하게 짜여진 API 에서 모든 요소의 의미가 명백하기 때문에 유용하다.
 * 해체할때 원하는 데이터에 변수 이름을 줄 수 있다.
 * 이러한 점을 제외하고는 배열과 같다
 * 튜플의 요소중 선택적 선언은 맨 마지막 요소에만 할 수 있다.
 */
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;

    console.log(`Provided coordinates had ${coord.length} dimensions`);
}

setCoordinate([2,3,4]);
setCoordinate([1,2]);

// rest element 가 포함된 이러한 형태도 가능하다
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

// 이렇게 rest element 가 포함된 튜플은 length 를 가지지 않는다
const a2: StringNumberBooleans = ["hello", 1];
const b2: StringNumberBooleans = ["beautiful", 2, true];
const c2: StringNumberBooleans = ["world", 3, true, false, true, true, false];

// 나머지 매개변수(rest element)와 함께 가변 개수의 인수를 사용하고,
// 최소 개수의 요소가 필요하지만,
// 중간 변수를 소개하고 싶지 않을때 유용하다.
function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
}

// 위의 함수는 아래와 기본적으로 동일하다
function readButtonInput2(name: string, version: number, ...input: boolean[]) {

}

// 튜플은 대부분 한번 생성되고 나면 수정되지 않고 남아있는 경우가 많기 때문에,
// 가능하다면 readonly 속성을 달아주는것이 좋다
let point = [3, 4] as const;

// 이 함수는 내부에서 x,y 에 대해 아무 변형도 하고 있지 않지만,
// readonly 속성이 없을 경우 [number, number] 가 변형 가능한 튜플로 보고 에러를 일으킨다.
function distanceFromOrigin([x, y]: readonly [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
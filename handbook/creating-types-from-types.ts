export {}

/**
 * Generic Types
 */
/*
function identity<Type>(arg: Type): Type {
    return arg;
}

*/

// 제네릭 함수 인터페이스 형태
// let myIdentity: <Input>(arg: Input) => Input = identity;
// object literal type 으로도 쓸 수 있음
let myIdentity2: { <Type>(arg: Type): Type } = identity;

// 진짜 인터페이스 만들기
interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

/**
 * Generic Classes
 */
class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
}

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
}

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

/**
 * Using Type Parameters in Generic Constraints
 */
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};

getProperty(x, "a");
// Argument type "z" is not assignable to parameter type keyof {a: number, b: number, c: number, d: number}
// getProperty(x, "z");

/**
 * Using Class Types in Generics
 */
// 제네릭을 사용해서 factory 를 만들때 생성자 함수로 클래스 타입을 지정해야 합니다.
function create<Type>(c: { new(): Type }): Type {
    return new c();
}

class BeeKeeper {
    hasMast: boolean = true;
}

class ZooKeeper {
    nameTag: string = "Mikle";
}

class Animal1 {
    numLegs: number = 4;
}

class Bee extends Animal1 {
    numLegs = 6;
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal1 {
    keeper: ZooKeeper = new ZooKeeper();
}

// factory 함수
function createInstance<A extends Animal1>(c: new () => A): A {
    return new c();
}

console.log(create(Animal1).numLegs);
console.log(createInstance(Lion).keeper.nameTag);
console.log(createInstance(Lion).numLegs);
console.log(createInstance(Bee).keeper.hasMast);
console.log(createInstance(Bee).numLegs);
// 이 패턴은 믹스인 디자인 패턴을 강화하는데 사용됩니다

/**
 * Generic Parameter Defaults
 */
/*
// 아무 인수도 없을 경우 Div 생성
declare function create1(): Container<HTMLDivElement, HTMLDivElement[]>;
// element 를 첫번째 인수로 호출하는 경우엔 인수 타입의 element 생성
declare function create1<T extends HTMLElement>(element: T): Container<T, T[]>;
// 위의 조건을 충족하며, 선택적으로 children 도 넘겨줄 수 있음
declare function create1<T extends HTMLElement, U extends HTMLElement>(
    element: T,
    children: U[]
): Container<T, U[]>;

declare function create1<T extends HTMLElement = HTMLDivElement, U = T[]>(
    element?: T,
    children?: U
): Container<T, U>;

 */

/**
 * A generic parameter default follows the following rules:
 *
 * A type parameter is deemed optional if it has a default.
 * 타입 매개변수는 기본값이 있을 경우 선택형으로 간주된다
 * Required type parameters must not follow optional type parameters.
 * 필수 타입 매개변수는 선택형 타입 매개변수를 따르면 안된다 -> 선택형을 따르면 해당하는 매개변수도 필수가 아니라 선택형이 되어야 하기 때문에
 * Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
 * 타입 매개변수를 위한 기본 타입은 해당 타입 매개변수가 존재한다면, 그 타입 매개변수의 제약사항을 만족해야 한다.
 * When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
 * 인수를 지정할 때, 필수 타입 매개변수에 대한 인수만 지정하면 된다. 나머지 지정되지 않은 매개변수들은 기본값으로 확인된다.
 * If a default type is specified and inference cannot choose a candidate, the default type is inferred.
 * 기본값이 지정되었고, 추론이 후보를 특정하지 못하면, 기본값으로 추론된다.
 * A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
 * 기존 클래스나 인터페이스 선언과 병합될 수 있는 클래스나 인터페이스 선언은 존재하는 타입 매개변수를 설명하는 기본값이 있어야 한다.
 * A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.
 * 기존 클래스나 인터페이스 선언과 병합될 수 있는 클래스나 인터페이스 선언은 기본값을 지정하는 한에서는 새로운 타입 매개변수를 소개할 수 있어야 한다.
 */

/**
 * The keyof type operator
 */
type Point = { x: number; y: number };
type P = keyof Point;
// P = "x" | "y"

// index signature 를 사용하면 해당 키의 타입이 값이 된다
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// M = string | number

/**
 * The typeof type operator
 */
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
    return {x: 10, y: 3};
}

// TS2749: 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
// type P1 = ReturnType<f>;

type P1 = ReturnType<typeof f>;

/**
 * Limitations
 * typeof 의 한계
 * 변수에는 되지만 함수에는 ReturnType 과 같이 써야함
 */
declare const msgbox: (prompt: string) => boolean;
// type msgbox = any;
// function msgbox(s: string): boolean {
//     console.log(s);
//     if (s.length > 0) return true;
//     else return false;
// }

// 이건 됨
let shouldContinue: ReturnType<typeof msgbox>;
// 이건 안됨
// let shouldContinue: typeof msgbox("Are you sure you want to continue?");

/**
 * Indexed Access Types
 * 또다른 타입의 특정 프로퍼티를 찾는데에 indexed access type 을 사용할 수 있다.
 */
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];

// 인덱싱 타입 자체가 타입이므로 union 이나 keyof 등 다른 타입들도 전체적으로 사용할 수 있다.
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];

// 타입에 오타가 있으면 에러
// Property 'aliv' does not exist on type 'Person'.
// type AliveOrName = "aliv" | "name";
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

// typeof Array[number] 형태를 사용해서 배열의 요소를 타입으로 얻을 수 있다.
const MyArray = [
    {name: "Alice", age: 15},
    {name: "Bob", age: 23},
    {name: "Eve", age: 38}
];

type Person2 = typeof MyArray[number];

type Age1 = typeof MyArray[number]["age"];

// Or
type Age2 = Person2["age"];

// 인덱싱을 할 때에는 타입만 사용할 수 있다.
// 변수는 사용할 수 없다.
const key = "age";
//  TS2749: 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
// type Age3 = Person2[key];

// 그러나 이런 형태로는 사용 가능하다
type key = "age";
type Age4 = Person2[key];

/**
 * Conditional Types
 */
interface Animal2 {
    live(): void;
}

interface Dog1 extends Animal2 {
    woof(): void;
}

// type Example1 = number
type Example1 = Dog1 extends Animal2 ? number : string;

// type Example2 = string
type Example2 = RegExp extends Animal2 ? number : string;

interface IdLabel {
    id: number;
}

interface NameLabel {
    name: string;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//     throw "unimplemented";
// }

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}

// let a: NameLabel
let a = createLabel("typescript");
// let b: IdLabel
let b = createLabel(2.8);
// let c: IdLabel | NameLabel
let c = createLabel(Math.random() ? "hello" : 42);

/**
 * Conditional Type Constraints
 */
// TS2536: Type '"message"' cannot be used to index type 'T'.
// T 에 message 라는 프로퍼티가 있다고 선언되어 있지 않기 때문에 에러 발생
// type MessageOf<T> = T["message"];

// 이렇게 제약조건 걸어주면 더이상 에러 안남
// type MessageOf<T extends { message: unknown }> = T["message"];
// 만약, message 프로퍼티가 없는 경우엔 never 로 하고 싶다면
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
    message: string;
}

interface Dog2 {
    bark(): void;
}

// type EmailMessageContents: string
type EmailMessageContents = MessageOf<Email>;
// type DogMessageContents = never
type DogMessageContents = MessageOf<Dog2>;

// type Flatten<T> = T extends any[] ? T[number] : T;

// string[] 으로 넘긴 값에 대해 각 요소별 타입을 반환해준다.
type Str = Flatten<string[]>;

// number 로 넘겼으니 any[] 가 아니므로 넘긴 값 그대로의 타입을 반환해준다.
type Num = Flatten<number>;

/**
 * Inferring Within Conditional Types
 * 조건 타입에서의 추론
 */
// 위의 type Flatten 을 infer 키워드가 동작하는 방식으로 바꿔보면
type Flatten<T> = T extends Array<infer Item> ? Item : T;
// Item 이라는 자료형을 먼저 뽑기 때문에 좀 더 직관적임

// infer 키워드를 사용하면 몇가지 유용한 헬퍼를 만들 수 있다
// 간단한 예시로, 함수 타입에서 리턴 타입을 추출할 수 있다.
type GetReturnType<Type> = Type extends (...args: any[]) => infer Return ? Return : never;

type Num3 = GetReturnType<() => number>;
type Str1 = GetReturnType<(x: string) => string>;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
type Never1 = GetReturnType<any>;
//   ^? unknown
// type Never2 = GetReturnType</* 함수형이 아니면 전부 never 리턴 */>;
//   ^? never


// 추론은 함수 오버로드의 경우 가장 마지막에 선언된 함수의 리턴타입을 따라감
// 항상 마지막에 가장 포괄적인 오버로드 함수를 넣어줘야 할듯
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

/**
 * Distributive Conditional Types
 * @@@
 */

type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
// ToArray<string> | ToArray<number> 로 적용됨

// 분배 방식을 적용하고 싶지 않다면 extends 양쪽을 [] 로 감싸주면 됨
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArr2 = ToArrayNonDist<string | number>;

/**
 * Mapped Types
 */

type Horse = {};

type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse;
}

const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false
}

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
}

type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
}

// OptionsFlags 를 통해서 Features 의 프로퍼티들이 boolean 으로 바뀜
type FeatureOptions = OptionsFlags<Features>;


/**
 * Mapping Modifiers
 */

type CreateMutable<T> = {
    -readonly [Prop in keyof T]: T[Prop];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
}

// LockedAccount 의 프로퍼티들에 readonly 속성 제거
type UnlockedAccount = CreateMutable<LockedAccount>;

type Concrete<T> = {
    [Prop in keyof T]-?: T[Prop];
}

type MaybeUser = {
    id: string;
    name?: string;
    age: number;
}

type User = Concrete<MaybeUser>;

/**
 * Key Remapping via as
 */

/*
// 해당 Type 의 프로퍼티들의 키를 이런식으로 NewKeyType 으로 변경 가능
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties];
}

 */

// key 이름을 getKey 로, Descriptor 를 함수로 바꿈
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
}

interface Person3 {
    name: string;
    age: number;
    location: string;
}

// type LazyPerson1 = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }
type LazyPerson1 = Getters<Person3>;

type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle1 {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle1>;

// keyof 를 쓰면 E 는 단순히 Events 의 각 프로퍼티가 되는데
// E in Events as E["kind"] 는 E 가 Event 객체가 된다
type EventConfig1<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent1 = { kind: "square", x: number, y: number };
type CircleEvent1 = { kind: "circle", radius: number };

type Config1 = EventConfig1<SquareEvent1 | CircleEvent1>;

// const configCircle: Config1 = {
//     circle: (a: {
//         kind: "circle",
//         radius: 3
//     }) => {
//         return a;
//     },
//     square: (event: {
//         kind: "square",
//         x: 3, y: 4
//     }) => {
//         return event;
//     }
// }
// console.log(configCircle)

type ExtractPII1<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
}

type DBFields1 = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
}

type ObjectNeedingGDPRDeletion1 = ExtractPII1<DBFields1>;

/**
 * Template Literal Types
 */

type World = "world";
type Greeting = `hello ${World}`;
// type Greeting = 'hello world'

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// 비교적 작은 문자열 집합을 만드려고 할 때 유용함

/**
 * String Unions in Types
 */
/*
const passedObject = {
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
    test1: {
        key1: "k1"
    }
};

type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
}

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject(passedObject);

person.on("firstNameChanged", () => {});

// TS2345: Argument of type '"firstName"' is not assignable to parameter of type '"ageChanged" | "firstNameChanged" | "lastNameChanged"'.
// person.on("firstName", () => {});

// 오타 확인가능
// person.on("frstNameChanged", () => {});

 */
/**
 * Inference with Template Literals
 */
type PropEventSource1<Type> = {
    on<Key extends string & keyof Type>
    (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject1<Type>(obj: Type): Type & PropEventSource1<Type>;

const person1 = makeWatchedObject1({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
});

person1.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});

person1.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})

/**
 * Intrinsic String Manipulation Types
 * 내장 문자열 조작 타입
 * Typescript 컴파일러에 포함되어있기 때문에 .d.ts 에서 찾을 수는 없다.
 */

// Uppercase<StringType>
type Greeting1 = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting1>;
// type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">

// Lowercase<StringType>
// Capitalize<StringType>
// Uncapitalize<StringTypes>
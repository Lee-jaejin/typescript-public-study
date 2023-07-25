export {}

/**
 * Function Type Expressions
 */
// 함수를 설명하는 가장 간단한 방법은 함수 타입 표현식을 가지고 하는것이다.
// 이 타입들은 문법적으로 화살표 함수와 비슷하다.
// function greeter(fn: (a: string) => void) {
//     fn("Hello, World");
// }
// fn: (a: string) => void 의 의미는
// a 라는 이름을 가지고 string 타입을 갖는 하나의 파라미터를 갖는 함수 fn 을 매개변수로 받는데, 이 함수는 리턴값이 없다.
// 라는 의미이다.
// 파라미터의 타입이 정해지지 않으면 암묵적으로 any 로 된다.

function printToConsole(s: string) {
    console.log(s);
}

// 당연히 아래와 같이 타입 선언을 해서 사용할 수도 있다.
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
    fn("Hello, World");
}

greeter(printToConsole);

/**
 * Call Signatures @@@
 * 호출 서명
 * 일반적인 함수 정의는 프로퍼티를 넣을 수 없지만,
 * 호출 서명을 이용하면 함수를 object 타입으로 프로퍼티를 추가할 수 있다.
 */
type DescribableFunction = {
    description: string;
    // 호출 서명은 매개변수와 반환 자료형 사이에
    // => 대신 : 를 사용해야 한다.
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);

/**
 * Construct Signatures @@@@
 * 생성 서명
 * Call Signature 의 앞에 new 키워드를 넣는 것으로 생성 서명을 할 수 있다.
 */
type SomeConstructor = {
    new (s: string): SomeObject;
}

type SomeObject = any;

function fn(ctor: SomeConstructor) {
    return new ctor("Hello");
}

// fn({});

// Date 와 같은 몇 object 는 new 키워드로 불릴 수도 있고 없이 불릴 수도 있다.
// 이와 같은 것을 임의로 아래와 같이 만들 수 있다.
interface CallOrConstruct {
    new (s: string): Date;
    (s?: string): Date;
}

/**
 * Generic Functions
 * 입력에 따른 출력의 자료형을 동일하게 또는 관계있는 것으로 맞춰줄 수 있다.
 */
/*
function firstElement(arr: any[]) {
    return arr[0];
}
// 이런 함수가 있을 경우에 입력 자료형에 따른 출력 자료형은 그냥 any 로 밖에 줄 수 없다
 */

function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
// s: string | undefined
const s = firstElement(["a", "b", "c"]);
// n: number | undefined
const n = firstElement([1, 2, 3]);
// u: undefined
const u = firstElement([]);
// 위와 같이 반환 자료형을 입력 자료형과 연관지어 알 수 있음.

/**
 * Inference
 * 추론
 * 입력과 출력 자료형의 선언을 통해 입력에 따른 출력의 자료형을 추론할 수 있다
 */
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

// n 은 string
// parse 는 number[] 이다
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

/**
 * Constraint
 * 제약사항
 * 제네릭에 특정 자료형을 강제할 수 있다
 */
function longest<Type extends { length: number }>(a: Type, b: Type): Type {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");
// const notOK = longest(10, 100); // error

/**
 * Working with Constrained Values
 * 제약값 사용하기
 */
/*
// 제네릭 제약사항을 사용할때 흔히 나오는 에러
function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
): Type {
    if (obj.length >= minimum) {
        return obj;
    } else {
        // Type 은 length: number 를 포함하는 값이지 length 만 있어서는 안되기 때문에 에러
        return { length: minimum };
    }
}

 */

/**
 * Specifying Type Arguments
 * 매개변수 타입 특정하기
 * 제네릭 타입에 어떤 값이 들어갈지 자료형을 특정할 수 있다.
 */
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// const arr = combine([1,2,3], ["hello"]);
const arr = combine<number | string>([1, 2, 3], ["hello"]);
console.log(arr);

/**
 * Guidelines for Writing Good Generic Functions
 * 좋은 제네릭 함수를 작성하는 가이드라인
 * 1. 가능한 좁은 타입을 사용해라 (제약 사항보다는 있는 타입 그대로를 사용하는게 더 유리 -> 추론이 제약 사항을 우선해서 표기하기 때문)
 * 2. 가능한 타입 파라미터를 적게 사용해라
 * 3. 타입 파라미터는 두번은 무조건 나와야 하니 필요없는 경우엔 사용하지 마라
 */

/**
 * Optional Parameters
 * 선택적인 파라미터
 * ? 를 사용해서 파라미터를 선택적으로 받을 수 있다.
 * ? 선언된 변수는 항상 undefined 를 받을 수 있다.
 */

/**
 * Optional Parameters in Callbacks
 * 콜백에서의 선택적 파라미터 -> 쓰지마라
 * 어차피 호출할때 인수가 함수 정의의 인수보다 많으면 나머지는 무시된다
 * -> 콜백에서는 선택적 파라미터를 쓸 필요가 없다
 */
/*
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

 */
// 대신에
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
} // 이렇게 쓰라는거

myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed()); // TypeScript 가 이를 표시해주기는 하지만
})

// myForEach 의 실제 구현체는 사실상 callback(arr[i); 만 하겠다는 거나 마찬가지인 셈이 되므로,
// callback(arr[i]) 으로 의도된 것이 아니라면 선택적 파라미터를 쓰지 마라.

/**
 * Function Overloads
 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number) {
    if (d !== undefined && y !== undefined) {
        console.log('if')
        return new Date(y, mOrTimestamp, d);
    } else {
        console.log('else')
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

// console.log(d1, d2, d3);

function fn1(x: string): string;
// TS2394: This overload signature is not compatible with its implementation signature.
// function fn1(x: number): boolean;
function fn1(x: string | number) {
    return "oops";
}


/**
 * Writing Good Overloads
 */
// function len(s: string): number;
// function len(arr: any[]): number;
function len(x: any[] | string) {
    return x.length;
}

len("");
len([0]);
len(Math.random() > 0.5 ? "hello" : [0]);
// 가능한 경우 오버로드보다 유니언을 사용하자

/**
 * Declaring `this` in a Function
 */
const user = {
    id: 123,

    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    }
};

/*
interface User {
    id: number;
    admin: boolean;
}
declare const getDB: () => DB;

interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
    return this.admin;
});

 */
// filter 에서 this 를 매개변수로 받을 때 화살표 함수는 사용할 수 없다. (화살표함수 안에서는 해당 객체에 대한 this 를 사용할 수 없음)

/**
 * Other Types to Know About
 * void
 * object -> function 도 object
 * (function 은 Object.prototype 을 프로토타입 체인에 가지고 있으며,
 * instanceof Object 이고 Object.keys 호출도 가능하다.)
 * unknown -> any 랑 비슷하지만, unknown 타입을 가지고 할 수 있는 일이 없기 때문에 any 보다 안전하다
 *
 */
/*
function safeParse(s: string): unknown {
    return JSON.parse(s);
}

// Need to be careful with 'obj'!
// obj 를 다룰 때 조심할 필요가 있다
const obj = safeParse('adsfoiajdsfioajowifnoaie');

 */

function fn2(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; // has type 'never'!
    }
}

// 리턴이 any 로 되기 때문에 가장 피해야 하는 함수 유형
function doSomething2(f: Function) {
    return f(1, 2, 3);
}
// 임의의 함수를 허용해야 하지만 호출할 의도가 없다면 일반적으로 () => void 형태가 더 안전하다

/**
 * Rest Parameters and Arguments
 */

function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}

const a = multiply(10, 1,2,3,4);
console.log(a);

// args 가 불변 배열이라고 생각하지 않으므로 as const 를 달아주어야
// A spread argument must either have a tuple type or be passed to a rest parameter.
// 위의 에러가 안남.
// args 는 Array<T> 나 T[] 와 같이 타입이 지정된 배열이거나 튜플형이어야 함
const args = [8, 5] as const;
const angle = Math.atan2(...args);
console.log(angle);

const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
console.log(dst);

function f2(): void {
    // @ts-expect-error
    return true;
}

const f3 = function (): void {
    // @ts-expect-error
    return true;
}
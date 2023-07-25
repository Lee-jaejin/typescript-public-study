exports = {}
/**
 * Enums
 * 열거형은 계산된 값도 받을 수 있지만,
 * 함수 반환식의 계산된 값은 첫번째로 올 수는 없다.
 */

/*
function getSomeValue() {
    return 23;
}
enum E {
    A = getSomeValue(),
    B //  TS1061: Enum member must have initializer.
}

 */

/**
 * Union enums and enum member types
 */
enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}
/*
let c: Circle = {
    kind: ShapeKind.Square, // error
    radius: 100
}

 */
/*
enum E {
    Foo,
    Bar
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        // This comparison appears to be unintentional because the types 'E.Foo' and 'E.Bar' have no overlap.
    }
}

 */

/**
 * Enums at runtime
 */
enum E {
    X,
    Y,
    Z
}

function f(obj: { X: number }) {
    return obj.X;
}

// X 를 number 로 갖는 프로퍼티가 있기 때문에 동작.
f(E);

/**
 * Enums at compile time
 */
enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}

// @@@
// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is: ", key);
        console.log("Log level value is: ", num);
        console.log("Log level message is: ", message);
    }
}
printImportant("ERROR", "This is a message");

/**
 * Reverse Mappings
 */
enum Enum {
    A
}

let a = Enum.A;
let nameOfA = Enum[a];
console.log(a);
console.log(nameOfA);


/**
 * `const` enums
 */
const enum Enum1 {
    A = 1,
    B = A * 2,
}

// console.log(Enum1) // error

const enum Direction {
    Up,
    Down,
    Left,
    Right
}

let directions = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right
];

// 여기서 생성된 자바스크립트 코드는 아래와 같을 것이다.
/*
"use strict";
let directions = [
    0, 1, 2, 3
];

 */

// 최신 TypeScript 에서는 const enum 왠만하면 사용하지마라
// 사용 안해도 as const 로 지정된 값이 있으면 똑같이 사용가능
const enum EDirection {
    Up,
    Down,
    Left,
    Right
}

const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
} as const;
type Direction1 = typeof ODirection[keyof typeof ODirection];

console.log(EDirection.Up);

console.log(ODirection.Up);

function walk(dir: EDirection) {}

function run(dir: Direction1) {}

walk(EDirection.Left);
run(ODirection.Right);
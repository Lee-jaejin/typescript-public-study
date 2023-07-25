export {}

/**
 * 데코레이터를 사용하려면
 * compilerOptions 에서 target: "ES5" 이상,
 * experimentalDecorators: true 가 되어야 한다
 */

/**
 * Decorators
 * 데코레이터
 * 클래스 선언, 메서드, 접근자, 프로퍼티 또는 매개변수에 첨부할 수 있는 특수한 종류의 선언.
 */
/*
function sealed(target) {

}

 */

/**
 * Decorator Factories
 * 데코레이터 팩토리
 * 데코레이터가 선언에 적용되는 방식을 원하는대로 바꾸고 싶다면 사용
 * 데코레이터가 런타임에 호출할 표현식을 반환하는 함수
 */

/*
function color(value: string) {
    if (value === "test") {
        return function (target) {
            // do something
        }
    } else {
        return function (target) {
            // do something else
        }
    }
}
@color('test')

 */

/**
 * Decorator Composition
 * 데코레이터 합성
 * 단일 행일 경우
 * @f @g x
 * 여러 행일 경우
 * @f
 * @g
 * x
 * 이런식으로 가능
 * 위에서 아래로 평가되고 아래서 위로 호출됨
 * 평가 f -> 평가 g -> 호출 g -> 호출 f
 */
function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}

class ExampleClass {
    @first()
    @second()
    method() {
        console.log('test')
    }
}

new ExampleClass().method();

/**
 * Class Decorators
 * 클래스 데코레이터
 * 클래스 선언 직전에 선언됨. (class)
 * 클래스 생성자에 적용되며, 클래스 정의를 관찰, 수정 또는 교체하는데 사용할 수 있음.
 * 선언 파일이나 다른 주변 컨텍스트(예: 선언 클래스)에서 사용할 수는 없다.
 *
 * 클래스 데코레이터의 표현식은 데코레이팅된 클래스의 생성자를 유일한 인수로 런타임에 함수로 호출됨.
 *
 * 클래스 데코레이터가 값을 반환하면 클래스 선언을 제공된 생성자 함수로 대체함.
 */
@sealed
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function reportableClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = "http://www...";
    };
}

@reportableClassDecorator
class BugReport1 {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

const bug = new BugReport1("Needs dark mode");
console.log(bug.title);
console.log(bug.type);
//  TS2339: Property 'reportingURL' does not exist on type 'BugReport1'.
// console.log(bug.reportingURL);

/**
 * Method Decorators
 * 메서드 데코레이터
 * 메서드 선언 직전에 선언됨. (function)
 * 메서드의 프로퍼티 설명자 (Property Descriptor) 에 적용되며,
 * 메서드 정의를 관찰, 수정 또는 대체하는데 사용할 수 있다.
 *
 * 메서드 데코레이터는 선언 파일, 오버로드 또는 기타 주변 컨텍스트(예: declare 클래스) 에서 사용할 수 없다.
 *
 * 메서드 데코레이터의 표현식은 런타임에 다음 세 개의 인수와 함께 함수로 호출됨.
 * 1. 정적(static) 멤버에 대한 클래스의 생성자 함수(class constructor function)
 *    또는 인스턴스 멤버에 대한 클래스의 프로토타입(prototype).
 * 2. 멤버의 이름(name)
 * 3. 멤버의 프로퍼티 설명자(property descriptor)
 *
 * 메서드 데코레이터가 값을 반환하면, 메서드의 프로퍼티 설명자(Property Descriptor)로 사용됨.
 */
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    }
}

// @enumerable(false) 데코레이터는 데코레이터 팩토리.
// @enumerable(false) 가 호출되면 프로퍼티 설명자의 enumerable 프로퍼티를 수정

/**
 * Accessor Decorators
 * 접근자 데코레이터
 * 접근자 선언 바로 전에 선언됨. (get, set)
 * 접근자의 프로퍼티 설명자(Property Descriptor)에 적용되며, 접근자의 정의를 관찰,
 * 수정 또는 교체하는데 사용할 수 있음.
 * 선언 파일이나 다른 주변 컨텍스트(예: declare class)에서 사용할 수 없음.
 *
 * 접근자 데코레이터의 표현식은 런타임에 다음 세 개의 인수와 함께 함수로 호출됨.
 * 1. 정적(static) 멤버에 대한 클래스의 생성자 함수(class constructor function)
 *    또는 인스턴스 멤버에 대한 클래스의 프로토타입(prototype).
 * 2. 멤버의 이름(name)
 * 3. 멤버의 프로퍼티 설명자(property descriptor)
 */
class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x;
    }

    @configurable(false)
    get y() {
        return this._y;
    }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    }
}

/**
 * Property Decorators
 * 프로퍼티 데코레이터
 * 다른것은 메서드, 접근자 데코레이터와 동일
 * 프로퍼티 데코레이터의 표현 식은 런타임에 두 개의 인수와 함께 함수로 호출됨.
 * 1. 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
 * 2. 멤버의 이름
 *
 * 다른 것은 메서드, 접근자 데코레이터와 동일하지만, 프로퍼티 설명자가 없다.
 * 프로퍼티 데코레이터는 특정 이름의 프로퍼티가 해당 클래스에 있는지만 확인할 수 있다.
 */
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

// formatString 으로 받은 문자열을 Reflect.metadata 함수를 이용해서
// "format" 설명을 갖는 심볼에 등록 - Symbol("format"): formatString 형태
// 이 때 데코레이터가 사용된 프로퍼티의 메타데이터로 저장됨
// Symbol("format") 의 greeting: "Hello, %s" 형태 ?
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

// target 으로 Greeter1 을 받아 propertyKey 로 받은 greeting 을
// 대상으로 메타데이터 값을 찾음
// target 에 greeting 에 대한 메타데이터 값이 없으면 undefined 반환
function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter1 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        // this 에서 greeting 에 대한 메타데이터 찾기
        let formatString = getFormat(this, "greeting");
        // formatString: "Hello, %s"
        console.log("formatString: ", formatString);
        console.log("this.greeting: ", this.greeting);
        return formatString.replace("%s", this.greeting);
    }
}

console.log(new Greeter1("jaejin").greet());

/**
 * @@@
 * Parameter Decorators
 * 파라미터 데코레이터
 * 메소드에 해당 파라미터가 정의되었는지 확인만 가능
 */
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[]
        = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    console.log("required propertyKey: ", propertyKey);
    console.log("required parameterIndex: ", parameterIndex);
    console.log("required existingRequiredParameters: ", existingRequiredParameters);
    Reflect.defineMetadata(
        requiredMetadataKey,
        existingRequiredParameters,
        target,
        propertyKey
    );
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value!;
    console.log("validate arguments: ", arguments);

    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        console.log("validate requiredParameters: ", requiredParameters);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}

class BugReport2 {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }

    @validate
    print(@required verbose: boolean) {
        if (verbose) {
            return `type: ${this.type}\ntitle: ${this.title}`;
        } else {
            return this.title;
        }
    }
}

const br2 = new BugReport2("butterfly");
console.log("===== verbose: ", br2.print(true));
console.log("=================")
console.log("==== non verbose: ", br2.print(false));


/**
 * @@@
 * Metadata
 */

class Point1 {
    // x, y 를 public 으로 바꿔줌
    constructor(public x: number, public y: number) {
    }
}

function validate1<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set!;

    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);

        if (!(value instanceof type)) {
            throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
        }

        set.call(this, value);
    }
}

class Line {
    // 여기서 start, end 가 private 이기 때문에
    // Point1 에서 x, y 를 public 으로 바꿔주지 않으면 바로 볼 수 없음
    #start: Point1;
    #end: Point1;

    @validate1
    // 아래 Reflect.metadata 는 없어도 되지만
    // 이렇게 붙이면 타입스크립트 컴파일러가 design-time 타입 정보를 주입한다.
    @Reflect.metadata("design:type", Point1)
    set start(value: Point1) {
        this.#start = value;
    }

    get start() {
        return this.#start;
    }

    @validate1
    @Reflect.metadata("design:type", Point1)
    set end(value: Point1) {
        this.#end = value;
    }

    get end() {
        return this.#end;
    }
}

const line = new Line();
line.start = new Point1(1, 2);

// @ts-ignore
// line.end = {}

// 위에 ts-ignore 로 line.end = {} 를 무시하게 되면
// 런타임 에러가 나게 된다.
// TypeError: Invalid type, got object not Point1.
console.log(line.start)
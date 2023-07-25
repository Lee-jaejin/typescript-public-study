export {}

/**
 * 클래스 데코레이터
 */
console.log('================ 클래스 데코레이터 ================');
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = "https://www.~~~";
    };
}

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor (t: string) {
        this.title = t;
    }
}

const bug = new BugReport("TestBug");
console.log(bug);
// 클래스 타입은 타입시스템이 reportingURL 을 인식하지 못하기 때문에 변경되지 않음

/**
 * 메서드 데코레이터
 */
console.log('================ 메서드 데코레이터 ================');
function HandleError() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);

        const method = descriptor.value;

        descriptor.value = function() {
            try {
                method();
            } catch (e) {
                console.log(e);
            }
        }
    };
}

class Greeter {
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const t = new Greeter();
// t.hello();

/**
 * 접근자 데코레이터
 * get set 에 적용
 */
console.log('================ 접근자 데코레이터 ================');

function Enumerable(enumerable: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = enumerable;
    }
}

class Person {
    constructor(private name: string) {}

    @Enumerable(true)
    get getName() {
        return this.name;
    }

    @Enumerable(false)
    set setName(name: string) {
        this.name = name;
    }
}

const person = new Person("Jaejin");
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

/**
 * 속성 데코레이터
 */
console.log('================ 속성 데코레이터 ================');

function format(formatString: string) {
    return function (target: any, propertyKey: string): any {
        let value = target[propertyKey];
        console.log(typeof value, value);
        console.log(typeof target[propertyKey], target[propertyKey]);

        function getter() {
            return `${formatString} ${value}`;
        }

        // undefined 도 원시값이기 때문에 얕은 복사가 되는듯
        // value = newVal 하니까
        // target[propertyKey] 도 같은 값으로 할당됨
        function setter(newVal: string) {
            value = newVal;
            console.log(target[propertyKey], 'setter');
        }

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        }
    }
}

class Greeter2 {
    @format('Hello')
    greeting: string;
}

const t2 = new Greeter2();
t2.greeting = 'World';
console.log(t2.greeting);
t2.greeting = 'Test';
console.log(t2.greeting);

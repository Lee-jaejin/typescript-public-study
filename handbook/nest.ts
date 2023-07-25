export {}


function ReportableClassDecorator<T extends { new (...args: any[]): object }>(
    con: T,
) {
    return class extends con {
        reportingURL = 'http://www.example.com';
    }
}

@ReportableClassDecorator
class BugReport {
    type = 'report';
    title: string;
    constructor(t: string) {
        this.title = t;
    }
}

const bug = new BugReport('Needs dark mode');
console.log(bug);

/*
function HandleError() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log('target', target);
        console.log('propertyKey', propertyKey);
        console.log('descriptor', descriptor);

        const method = descriptor.value;
        descriptor.value = function () {
            try {
                method();
            } catch (error) {
                console.log('error handled');
                console.error(error);
            }
        };
    };
}

class Greeter {
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const g = new Greeter();
g.hello();

 */

function Enumerable(enumerable: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.enumerable = enumerable;
    };
}

class Person {
    constructor(private name: string) {}

    @Enumerable(true)
    @Enumerable(false)
    get getName() {
        return this.name;
    }

    @Enumerable(false)
    set setName(name: string) {
        this.name = name;
    }
}

const p = new Person('dong');
for (const key in p) {
    console.log(`${key} : ${p[key]}`);
}
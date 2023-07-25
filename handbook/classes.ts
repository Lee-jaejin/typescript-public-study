export {}

/**
 * Fields
 */

class Point3 {
    // x: number;
    // y: number;

    constructor(x: number, y: number);
    constructor(s: string);
    constructor(xs: any, y?: any);
    constructor(...args: any[]) {
        // TBD
    }
}

const pt = new Point3(3, 4);
// pt.x = 0;
// pt.y = 0;
const p2 = new Point3('sdf');

// 초기화 오류가 발생하지 않도록 하려면 definite assignment assertion operator ! 를 쓰면 된다.
// 외부 라이브러리가 내 클래스의 일부분을 채울때 사용할 수 있음

// 생성자 안에서 호출된 매서드는 초기화 확인을 하지 않는다 -> 파생 클래스에서 메소드 오버라이딩 등으로 초기화에 실패할 수있기 때문 ? @@@

class Greeter1 {
    readonly name: string = "world";

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }

    // err() {
    //     this.name = "not ok";
    // }
}

const g = new Greeter1("is ok?");
// g.name = "also not ok";
console.log(g);

class Base1 {
    k = 4;
}

class Derived1 extends Base1 {
    constructor() {
        // 파생 클래스는 생성자 구현체에서 this 의 호출이 super 보다 우선될 수 없다
        // console.log(this); // error
        super();
    }

}

class C {
    _length = 0;
    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }
}

// get/set 구현체 내부에 추가적인 논리가 없다면 그냥 public 필드로 만들고 get/set 을 만들 필요가 없다
// set 없이 get 만 정의되어 있다면 해당 프로퍼티는 자동으로 readonly 가 된다
// setter 에 매개변수의 타입이 지정되어 있지 않다면 자동으로 getter 의 반환 타입으로 지정된다.
// getter 와 setter 는 반드시 동일한 Member Visibility 를 가져야 한다.

class Thing {
    _size = 0;
    get size(): number {
        return this._size;
    }

    set size(value: string | number | boolean) {
        let num = Number(value);

        console.log(num);
        if (!Number.isFinite(num)) {
            this._size = 0;
            return;
        }

        this._size = num;
    }
}

const thing1 = new Thing();
thing1.size = "strings";
console.log(thing1.size);

/**
 * Index Signatures
 */
class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
        return this[s] as boolean;
    }
}

// 인덱스 시그니처 타입도 메소드의 타입을 잡아야 하기 때문에 이러한 타입을 유용하게 사용하기가 쉽지 않다
// 일반적으로 인덱싱된 데이터는 클래스 인스턴스 자체가 아닌 다른 위치에 저장하는 것이 좋다

/**
 * Class Heritage
 * 클래스 유산
 */

/**
 * `implements` Clauses (절)
 * 해당 클래스가 특정 인터페이스를 충족하는지 확인을 하기 위해 `implements` 절을 사용할 수 있다.
 * 클래스는 여러개의 인터페이스를 implements 로 받을 수 있다
 */

/**
 * Cautions
 * 주의 사항
 */

/*
interface Checkable {
    check(name: string): boolean;
}

// implement 절은 해당 클래스의 내용을 변경하지 않음
class NameChecker implements Checkable {
    // TS7006: Parameter 's' implicitly has an 'any' type.
    check(s) {
        return s.toLowerCase() === "ok";
    }
}

 */

/**
 * Overriding Methods
 */
class Base2 {
    greet() {
        console.log("Hello, world!");
    }
}

class Derived2 extends Base2 {
    greet(name?: string) {
        if (name === undefined) {
            super.greet();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}

const d = new Derived2();
d.greet();
d.greet("reader");
const b: Base2 = d;
b.greet();

// 상위 클래스의 규칙을 따르지 않으면 에러
// 위의 경우 greet(name: string) 일 경우 상위 클래스는 greet() 이므로 성립되지 않음

/**
 * Type-only Field Declarations
 * target >= ES2022 거나 useDefineForClassFields: true 일 경우,
 * 상위 클래스의 생성자가 완료될 경우 파생 클래스의 모든 필드들의 값이 덮어써진다.
 * 이는 파생 클래스에서 더 정확한 타입을 선언하여 재정의 하고 싶은 경우에 문제가 될 수 있다.
 * 이를 방지하려면 `declare` 구문을 써서 런타임에 아무런 효과가 없도록 나타내야 한다.
 */

interface Animal3 {
    dateOfBirth: any;
}

interface Dog3 extends Animal3 {
    breed: any;
}

class AnimalHouse {
    resident: Animal3;

    constructor(animal: Animal3) {
        // 이때 파생 클래스의 resident 도 같이 초기화되는듯
        // target >= ES2022 이거나 useDefineClassFields: true 일때
        this.resident = animal;
    }
}

class DogHouse extends AnimalHouse {
    // 이 구문은 JavaScript 코드로 변경되지 않고 타입 보장만 한다.
    declare resident: Dog3;

    constructor(dog: Dog3) {
        super(dog);
    }
}

/**
 * Initialization Order
 * 초기화 순서
 */
class Base4 {
    name = "Base";

    constructor() {
        console.log("My name is " + this.name);
    }
}

class Derived4 extends Base4 {
    name = "derived";
}

const d4 = new Derived4();
// JavaScript 에 정의된 것에 의하면 위 코드의 초기화 순서는 다음과 같다
// Base 클래스와 필드들이 초기화된다
// Base 클래스의 생성자가 실행된다
// Derived 클래스의 필드들이 초기화된다
// Derived 클래스의 생성자가 실행된다.
// 즉, 아직 Derived 의 초기화가 이루어지지 않고 Base 의 생성자가 실행된 것이므로,
// 'My name is Base' 가 출력된다.

/**
 * Inheriting Built-in Types
 * 이 섹션은 target 을 ES6 / ES2015 이상의 버전으로만 쓸 계획이기 때문에 건너뜀
 */

/**
 * Member Visibility
 * 멤버 가시성
 */
// public
// 기본값, 어디서든 접근가능
class Greeter2 {
    public greet() {
        console.log("Hi!");
    }
}

const g2 = new Greeter2();
g2.greet();

// protected
// 파생클래스나 정의된 클래스 내에서만 접근가능
class Greeter3 {
    public greet() {
        console.log("Hello, " + this.getName());
    }

    protected getName() {
        return "jaejin";
    }
}

class SpecialGreeter extends Greeter3 {
    public howdy() {
        console.log("Howdy, " + this.getName());
    }
}

const g3 = new SpecialGreeter();
g3.greet();
g3.howdy();

// g3.getName(); // error

/**
 * Exposure of protected members
 * 보호된 멤버의 노출
 */
class Base5 {
    protected m = 10;
}

class Derived5 extends Base5 {
    m = 10;
}

const d5 = new Derived5();
// 상위 클래스에서 protected 로 지정된 m 이 노출되어버림.
// 파생 클래스에서 m 이 public 으로 재지정됐기 때문
// 의도한 동작이 아니라면 주의 필요 !!!
console.log(d5.m);


/**
 * @@@
 * Cross-hierarchy protected access
 * 교차상속 protected 접근
 * TypeScript 는 파생 클래스에서 상위 클래스의 멤버를 상위클래스 언급을 통해 불가능
 * Java 는 가능하고, C#, C++ 은 불가능하다
 * https://learn.microsoft.com/ko-kr/archive/blogs/ericlippert/why-cant-i-access-a-protected-member-from-a-derived-class
 */
class Base6 {
    protected x: number = 1;
}

class Derived6a extends Base6 {
    protected x: number = 5;
}

class Derived6b extends Base6 {
    f1(other: Derived6b) {
        other.x = 10;
    }

    f2(other: Base6) {
        // TS2446: Property 'x' is protected and only accessible
        // through an instance of class 'Derived6b'.
        // This is an instance of class 'Base6'.
        // other.x = 10;
    }
}

/**
 * private
 * 파생 클래스에서도 접근 불가능이기 때문에,
 * protected 처럼 파생 클래스에서 visibility 재조정 하는 것은 불가능하다
 */

/**
 * Cross-instance private access
 * 같은 클래스이지만 다른 인스턴스들 사이에 private 멤버에 대한 접근을 허용한다.
 * Java, C#, C++, Swift, PHP 는 이와같이 허용하고
 * Ruby 는 불가능하다
 */
class A {
    private x = 10;

    public sameAs(other: A) {
        return other.x === this.x;
    }
}

/**
 * Caveats
 * 주의 사항
 * TypeScript 의 private 키워드는 JavaScript 로 트랜스파일되면 사라진다.
 * 결론적으로
 * class MySafe {
 *     private secretKey = 12345;
 * }
 * const s = new MySafe();
 * console.log(s.secretKey); 가 트랜스파일된 후에는 사용할 수 있게된다.
 * 또는 트랜스파일에서도 에러가 안나는 경우가 있는데
 * console.log(s["secretKey"]);
 * 이런 형태로 접근하면 에러없이 사용할 수 있게 되어버린다.
 * 따라서 TypeScript 의 private 키워드는 soft private 이 된다.
 *
 * 반면에 JavaScript 의 private field (#) 은 위의 접근을 불허하고 온전히 private 으로서의 역할을 한다.
 * 따라서 이를 hard private 이라 볼 수 있다.
 *
 * @@@
 * 적대적인 것들로부터 클래스의 값을 보호하려면
 * closures, WeakMaps, private field (#) 과 같은
 * 강력한 런타임 보호 메커니즘을 사용해야 한다.
 */

// "use strict"
// class Dog {
//     #barkAmount = 0;
//     personality = "happy";
//
//     constructor() {
//     }
// }


/**
 * Static Members
 * 인스턴스에 의존하지 않는 정적 멤버
 * 클래스의 인스턴스화 없이 객체로 직접 접근해 사용할 수 있다.
 *
 * public, protected, private 의 동일한 가시성 수정자를 가질 수 있으며,
 * 상속도 동일하게 이루어진다.
 */

/**
 * Special Static Names
 * 특정 이름을 가진 static 멤버는 생성이 불가능하다
 * Function prototype 에 있는 프로퍼티 - name, length, call 등은 사용 불가
 */

/**
 * `static` Blocks in Classes
 * static 블록은 해당 클래스의 private 필드에 접근할 수 있는 구문을 만들 수 있게 해준다.
 * 이것은 문장 작성의 모든 기능, 유출 없는 변수, 클래스 내부에 대한 전체 액세스 권한으로
 * 초기화 코드를 작성할 수 있게 해준다.
 */
class Foo2 {
    static #count = 0;

    get count() {
        return Foo2.#count;
    }

    static {
        try {
            // const lastInstances = loadLastInstances();
            // Foo2.#count += lastInstances.length;
        } catch {
        }
    }
}

/**
 * Generic Classes
 * 제네릭 클래스는 인터페이스처럼 제네릭 제약이나 기본값을 사용할 수 있다.
 */
class Box<Type> {
    contents: Type;

    constructor(value: Type) {
        this.contents = value;
    }
}

const b2 = new Box("Hello!");


/**
 * Type Parameters in Static Members
 */
class Box2<Type> {
    // 클래스의 정적 멤버는 클래스 타입 파라미터를 따라가면 안됨
    // static defaultValue: Type;
}

/**
 * `this` at Runtime in Classes
 */

class MyClass1 {
    name = "MyClass";

    getName() {
        return this.name;
    }
}

const c = new MyClass1();
const obj = {
    name: "obj",
    getName: c.getName
}

// obj 언급을 통해 호출되었기 때문에 this 는 (MyClass1)클래스 인스턴스가 아니라 obj 가 된다
console.log(obj.getName())
// 출력: obj

/**
 * Arrow Functions
 * 위와 같은 현상이 일어나지 않으려면 화살표 함수를 사용하면 되는데,
 * 아래와 같은 트레이드오프가 발생한다
 */

class MyClass2 {
    name = "MyClass";
    // 이렇게 하면 this 는 각 함수마다 해당하는 클래스의 this 에 대한 사본을 갖게 된다.
    // 이는 만약 이 클래스가 파생 클래스일 경우 super 로 연결되는 상위 클래스
    // 프로토타입 체인을 가질 수 없다.
    // 각 함수마다 this 가 사본을 갖게 되므로 메모리 사용량이 증가한다
    // 타입스크립트가 확인하지 않더라도 런타임에서 this 가 값을 올바르게 가졌다고 보장해버린다.
    getName = () => {
        return this.name;
    };
}

const c2 = new MyClass2();
// const g1 = c2.getName;
const obj2 = {
    name: "obj",
    getName: c2.getName
}

console.log(obj2.getName());

/**
 * `this` parameters
 * TypeScript 의 함수 정의에서 첫번째 this 매개변수는 특별한 의미를 갖는다.
 */
// TypeScript 에서 this 를 입력값으로 받을 때
// function fn(this: SomeType, x: number) {}

// JavaScript 로 변환 시
// function fn(x) {}
class MyBase {
    k = 4;
    getK() {
        return this.k;
    }
}

class MyClass3 extends MyBase {
    name = "MyClass";
    getName(this: MyClass3) {
        return this.name;
    }
    getName2(this: MyClass3) {
        // 상위 클래스 메소드를 불러올 수 있다.
        return super.getK() + this.name + "2";
    }
}
const c3 = new MyClass3();
console.log(c3.getName());
console.log(c3.getName2());

// 다른 변수에 할당한 메소드는 부를 수 없다.
// -> 메소드에 매개변수로 넘어가는 this 가 void 로 되기 때문에
const g4 = c3.getName;
const g5 = c3.getName2;
// TS2684: The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass3'.
// console.log(g4());
// console.log(g5())

/**
 * `this` Types
 */
class Box5 {
    contents: string = "";
    // return type 이 this 로 되어있음
    set(value: string) {
        this.contents = value;
        return this;
    }
}

class ClearableBox2 extends Box5 {
    clear() {
        this.contents = "";
    }
}

const a = new ClearableBox2();
// const b3: ClearableBox2
// this 가 파생클래스인 ClearableBox2 로 추론됨
const b3 = a.set("hello");
console.log(b3);

// this 를 매개변수의 타입 주석으로도 사용할 수 있음
class Box6 {
    contents: string = "";
    sameAs(other: this) {
        return other.contents === this.contents;
    }
}

class DerivedBox extends Box6 {
    otherContent: string = "?";
}

const base = new Box6();
const derived = new DerivedBox();
/**
 * TS2345: Argument of type 'Box6' is not assignable to parameter of type 'DerivedBox'.
 *   Property 'otherContent' is missing in type 'Box6' but required in type 'DerivedBox'.
 */
// derived.sameAs(base);

/**
 * `this` based type guards
 */
class FileSystemObject1 {
    isFile(): this is FileRep1 {
        return this instanceof FileRep1;
    }
    isDirectory(): this is Directory1 {
        return this instanceof Directory1;
    }
    isNetworked(): this is Networked1 & this {
        return this.networked;
    }

    constructor(public path: string, private networked: boolean) {
    }
}

class FileRep1 extends FileSystemObject1 {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}

class Directory1 extends FileSystemObject1 {
    children: FileSystemObject1[];
}

interface Networked1 {
    host: string;
}

const fso: FileSystemObject1 = new FileRep1("foo/bar.txt", "foo");

if (fso.isFile()) {
    console.log(fso.content);
} else if (fso.isDirectory()) {
    console.log(fso.children);
} else if (fso.isNetworked()) {
    console.log(fso.host);
}

// this 를 기반으로 한 타입 가드의 일반적인 사용에는 lazy validation 이 있다.
// 아래의 예시는 hasValue 호출이 true 인 경우에 value 의 undefined 를 제거해준다
class Box7<T> {
    value?: T;

    hasValue(): this is { value: T } {
        return this.value !== undefined;
    }
}

const box = new Box7();
box.value = "Gameboy";

console.log(box.value);

if (box.hasValue()) {
    console.log(box.value);
}

/**
 * Parameter Properties
 * 생성자의 매개변수로 선언하면 그 변수는 바로 해당 클래스의 프로퍼티가 된다
 */
class Params1 {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ) {
    }
}
const a1 = new Params1(1, 2 ,3);
console.log(a1.x);
// console.log(a1.z);

/**
 * Class Expressions
 * 클래스 표현식
 *
 * 클래스 표현식은 클래스 선언과 비슷하다.
 * 한가지 차이점은 이름이 필요없다는 것인데,
 * 바인딩된 식별자를 통해 접근할 수 있다.
 */
const someClass = class<Type> {
    content: Type;
    constructor(value: Type) {
        this.content = value;
    }
};

// m: 바인딩된 식별자
// const m: someClass<string>
const m = new someClass("Hello, world");

/**
 * Constructor Signatures
 * 생성자 서명
 * JavaScript 클래스들은 new 연산자를 통해 인스턴스화 된다
 * 클래스의 타입이 정해지면 InstanceType 타입 유틸리티가 이 작업을 모델링한다
 */
class Point4 {
    createdAt: number;
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.createdAt = Date.now()
        this.x = x;
        this.y = y;
    }
}

type PointInstance = InstanceType<typeof Point4>;

function moveRight(point: Point4) {
    point.x += 5;
}

const point = new Point4(3, 4);
moveRight(point);
console.log(point);
console.log(point.x);

/**
 * `abstract` Classes and Members
 * 추상 클래스와 멤버
 *
 * 구현체가 없는 클래스와 멤버,
 * 이 멤버들은 추상 클래스 안에만 있어야 하며, 직접적으로 인스턴스화 될 수 없다.
 * 추상 멤버가 전혀 없는 클래스는 concrete 라고 부른다
 * 추상 클래스를 상속받았지만 구현체가 없다면 에러가 난다.
 *
 */

/**
 * Abstract Construct Signatures
 * 추상 생성자 서명
 *
 * '추상 클래스로부터 상속받은 파생 클래스'의 인스턴스를 생성하는 함수를 만들려고 할때 사용
 */

abstract class Base3 {
    abstract getName(): string;

    printName() {
        console.log("Hello, " + this.getName());
    }
}

class Derived3 extends Base3 {
    getName() {
        return 'jaejin';
    }
}

// 1. 추상 생성자 서명에 타입이 명시되면
function greet(ctor: new () => Base3) {
    const instance = new ctor();
    instance.printName();
}

greet(Derived3);
/*
 TS2345: Argument of type 'typeof Base3' is not assignable to parameter of type 'new () => Base3'.
  Cannot assign an abstract constructor type to a non-abstract constructor type.
 */
// 2. 매개변수로 들어올 수 없는 추상 클래스는 에러가 남
// greet(Base3);



class Empty1 {}

function fn(x: Empty1) {
    // can't do anything with 'x', so I won't
}

// All OK!
fn('window');
fn({});
fn(fn);
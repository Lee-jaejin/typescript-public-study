export {}
/**
 * Awaited<Type>
 * await 후의 리턴 타입을 가져오기 위해 사용.
 * Promise 안의 것도 사용 가능하지만,
 * thenable 은 never 로 떨어짐.
 */
// type A = string
type A = Awaited<Promise<string>>;
// type B = number
type B = Awaited<Promise<Promise<number>>>;
type C = Awaited<boolean | Promise<number>>;

/**
 * Partial<Types>
 * 주어진 타입들을 모두 optional 로 설정함
 */
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: "organize desk",
    description: "clear clutter"
}

const todo2 = updateTodo(todo1, {
    description: "throw out trash"
})

console.log(todo2)

/**
 * Required<Type>
 * 주어진 타입을 모두 필수로 바꿈, Partial 의 반대
 */

/**
 * Readonly<Type>
 * 주어진 타입을 모두 readonly 로 바꿈
 * frozen object 와 같은 런타임에서 재할당이 불가능한 곳에 나타내기 좋음
 * frozen object 는 Object.freeze 참조
 *
 * 아래는 예시
 * function freeze<Type>(obj: Type): Readonly<Type>;
 */

/**
 * Record<Keys, Type>
 * 객체의 프로퍼티를 생성
 * Keys 를 key 로,
 * Types 를 value 로 갖음
 * 프로퍼티의 타입을 다른걸로 변경하며 매핑할때 유용
 */
interface CatInfo {
    age: number;
    breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" }
}

console.log(cats.boris);

/**
 * Pick<Type, Keys>
 * Type 으로부터 Keys 를 갖는 타입을 생성함
 * 단, Keys 는 Type 의 string literal 또는 union string literals 이어야 함
 */
interface Todo1 {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo1, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false
};

console.log(todo);

/**
 * Omit<Type, Keys>
 * Type 으로부터 Keys 를 제거한 타입을 반환
 * Pick 과 반대
 */
interface Todo2 {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type TodoPreview2 = Omit<Todo2, "description">;

const todo3: TodoPreview2 = {
    title: "Clean room",
    completed: false,
    createdAt: new Date().getTime()
};

console.log(todo3);

type TodoInfo = Omit<Todo2, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
    title: "Pick up kids",
    description: "Kindergarten closes at 5pm"
};

console.log(todoInfo);

/**
 * Exclude<UnionType, ExcludeMembers>
 * UnionType 에서 ExcludeMembers 에 할당 가능한 모든 멤버를 제거한 타입을 반환
 * UnionType 에 있는 ExcludeMembers 를 제외하고 반환
 */
type T0 = Exclude<"a" | "b" | "c", "a">;
// type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;
// type T2 = string | number

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>
/*
 type T3 = {
    kind: "square";
    x: number;
 } | {
    kind: "triangle";
    x: number;
    y: number;
 }
 */

/**
 * Extract<Type, Union>
 * Type 에서 Union 에 할당 가능한 모든 멤버를 추출해서 반환
 */
type T01 = Extract<"a" | "b" | "c", "a" | "f">;
// type T01 = "a"
type T11 = Extract<string | number | (() => void), Function>;
// type T11 = () => void
type Shape1 =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type T21 = Extract<Shape1, { kind: "circle" }>
/*
 type T21 = {
    kind: "circle";
    radius: number;
 }
 */

/**
 * NonNullable<Type>
*  Type 에서 null 과 undefined 를 제외한 타입을 반환
 */
type T02 = NonNullable<string | number | undefined>;
// type T02 = string | number
type T12 = NonNullable<string[] | null | undefined>;
// type T12 = string[]

/**
 * Parameters<Type>
 * Type 은 함수 타입만 받음.
 * 함수의 매개변수를 튜플타입으로 반환
 */
declare function f1(arg: { a: number; b: string }): void;

type T03 = Parameters<() => string>;
// type T03 = []

type T13 = Parameters<(s: string) => void>;
// type T13 = [s: string]

type T23 = Parameters<<T>(arg: T) => T>;
// @@@
// type T23 = [arg: unknown]

type T33 = Parameters<typeof f1>;
// type T33 = [arg: {
//     a: number;
//     b: string;
// }]

type T43 = Parameters<any>;
// @@@
// type T4 = unknown[]

type T53 = Parameters<never>;
// @@@
// type T53 = never

// TS2344: Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T63 = Parameters<string>;

// TS2344: Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//   Type 'Function' provides no match for the signature '(...args: any): any'.
// type T73 = Parameters<Function>;

/**
 * ConstructorParameters<Type>
 * 생성자 함수의 매개변수로 된 튜플이나 배열을 반환한다
 * 매개변수가 배열이면 배열을 반환, 나머지는 튜플형태로 반환
 * Type 이 함수가 아니면 never 를 반환한다
 */

type T04 = ConstructorParameters<ErrorConstructor>;
// type T04 = [message?: string]
type T14 = ConstructorParameters<FunctionConstructor>;
// type T14 = string[]
type T24 = ConstructorParameters<RegExpConstructor>;
// type T24 = [pattern: string | RegExp, flags?: string]
class C1 {
    constructor(a: number, b: string) {
    }
}
type T34 = ConstructorParameters<typeof C1>;
// type T34 = [a: number, b: string]
type T44 = ConstructorParameters<any>;
// type T44 = unknown[]

// type T54 = ConstructorParameters<Function>; // error
// TS2344: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//   Type 'Function' provides no match for the signature 'new (...args: any): any'.

/**
 * ReturnType<Type>
 * 함수의 반환 타입을 반환한다
 */
declare function f2(): { a: number; b: string };

type T05 = ReturnType<() => string>;
// type T05 = string
type T15 = ReturnType<(s: string) => void>;
// type T15 = void
type T25 = ReturnType<<T>() => T>;
// type T25 = unknown
type T35 = ReturnType<<T extends U, U extends number[]>() => T>;
// type T35 = number[]
type T45 = ReturnType<typeof f2>;
// type T45 = {
//     a: number;
//     b: string;
// }
type T55 = ReturnType<any>;
// type T55 = any
type T65 = ReturnType<never>;
// type T65 = never
// type T75 = ReturnType<string>; // error
// error TS2344: Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T85 = ReturnType<Function>; // error
// TS2344: Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//   Type 'Function' provides no match for the signature '(...args: any): any'.

/**
 * InstanceType<Type>
 * 생성자 함수 타입 Type 의 인스턴스 타입을 반환함
 */
class C2 {
    x = 0;
    y = 0;
}

type T06 = InstanceType<typeof C2>;
// type T06 = C2
type T16 = InstanceType<any>;
// type T16 = any
type T26 = InstanceType<never>;
// type T26 = never
// type T36 = InstanceType<string>; // error
// TS2344: Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
// type T46 = InstanceType<Function>; // error
//  TS2344: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//   Type 'Function' provides no match for the signature 'new (...args: any): any'.

/**
 * ThisParameterType<Type>
 * 함수의 매개변수에 있는 this 의 타입을 반환
 * this 가 없다면 unknown 반환
 */
function toHex(this: Number) {
    return this.toString(16);
}

// 함수 매개변수 받을거니까 매개변수로 this 타입이 필요 -> ThisParameterType
function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}

/**
 * OmitThisParameter<Type>
 * Type 에서 this 를 제거하고 반환
 * Type 에 this 가 없다면 그냥 Type 반환
 *
 */
// const fiveToHex: typeof toHex => toHex.bind(5);
// 위와 같이하면 타입은 이렇게 됨 const fiveToHex: (this: Number) => string
// bind 할거면 thisArg 안받을거니까 함수 매개변수에서 this 빼줘야 함 -> OmitThisParameter 사용
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());

/**
 * ThisType<Type>
 * 이 도구는 변형된 타입을 반환하지 않음.
 * 대신에 상황에 맞는 this 타입을 마킹해 준다.
 * noImplicitThis 가 활성화 되어야 이 도구를 쓸 수 있다.
 */
type ObjectDescriptor<D, M> = {
    data?: D,
    methods?: M & ThisType<D & M>; // 이제 메소드 안에 있는 this 타입은 D & M 이 된다
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
}

/*
 여기서 this 는 { x: number, y: number } & { moveBy(dx: number, dy: number): void }
 가 된다.
 메소드의 프로퍼티는 추론 타겟인 동시에 this 타입의 소스가 된다.
 */
let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx; // 여기서 this 의 타입이 강제됨
            this.y += dy; // 여기서 this 의 타입이 강제됨
        }
    }
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
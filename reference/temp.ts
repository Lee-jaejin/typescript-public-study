export {}

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

// y = x; // 성공
// x = y; // 실패
// 함수 매개변수는 앞의 타입이 일치한다면 뒤의 타입은 무시되어도 됨.
// 그래도 같은 타입으로 본다.

let x1 = () => ({name: "Alice"});
let y1 = () => ({name: "Alice", location: "Seattle"});

// x1 = y1;
// y1 = x1;
// 둘다 안되는데..?
// 문서에는 원본 함수의 반환 타입이 대상 타입의 반환 타입의 하위 타입이 되도록 한다고 되어있음.
// x1 = y1 은 되어야 한다는거
// y1 이 x1 보다 프로퍼티가 하나 더 많아서

// 타입은 파생 - 상위 관계일 경우 파생 클래스가 상위 클래스에 할당은 가능하고,
// 그 반대는 안됨. 파생 클래스에 상위 클래스의 할당은 안됨.

function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... 'args'를 사용하여 콜백을 호출함 ... */
}
// 바람직하지 않음 - invokeLater는 "아마도" 여러개의 인수를 제공합니다
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
// 혼란스럽고 (x와 y가 실제로 필요함) 발견할 수 없음
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));

// 클래스의 타입 비교는 인스턴스 멤버(static 없는 변수나 메소드)만 함.
// static 과 constructor 는 안함
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) {}
    print() {
        console.log("prints");
    }
}
class Size {
    feet: number;
    constructor(numFeet: number) {}
    static print() {
        console.log("prints");
    }
}
let a: Animal;
let s: Size;
// a = s; // 실패
s = a; // 성공


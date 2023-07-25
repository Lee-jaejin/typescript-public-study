export {}

/**
 * Declaration Merging
 * 선언 병합
 * 타입스크립트에서 선언은 namespace, type, value 중 적어도 하나의 엔티티를 만든다.
 */

/**
 * Merging Interfaces
 * 인터페이스 병합은 Namespace 와 Value 를 생성한다
 */
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };

// 보통 interface merging 은 선언된 것과 같은 순서로 이루어지지만
// 오버로드는 있는 경우엔 더 앞에 순서로 선언되게 된다.
// 매개변수에 union 이 아닌 문자열이 있으면 위로 올라온다.
interface Document {
    createElement(tagName: any): Element;
}

interface Document {
    createElement(tagNAme: "div"): HTMLDivElement;
    createElement(tagNAme: "span"): HTMLSpanElement;
}

interface Document {
    createElement(tagNAme: string): HTMLElement;
    createElement(tagNAme: "canvas"): HTMLCanvasElement;
}

// 위의 인터페이스는 아래처럼 병합될 것이다.
interface Document {
    createElement(tagNAme: "canvas"): HTMLCanvasElement;
    createElement(tagNAme: "div"): HTMLDivElement;
    createElement(tagNAme: "span"): HTMLSpanElement;
    createElement(tagNAme: string): HTMLElement;
    createElement(tagName: any): Element;
}

/**
 * Merging Namespace
 * namespace 에 선언된 것들은 export 해줘야 병합이 일어난다
 * export 되지 않은 값은 원본 namespace 가 아니면 접근할 수 없다
 *
 * namespace 선언은 항상 병합되는 class, function, enum 보다 아래에 있어야 한다.
 */

class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel {}
}
console.log(Album);

function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}

console.log(buildLabel);
console.log(buildLabel("Jaejin"));

enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        } else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        } else if (colorName == "magenta") {
            return Color.red + Color.blue;
        } else if (colorName == "cyan") {
            return Color.green + Color.blue;
        } else {
            return "";
        }
    }
}

/**
 * Disallowed Merges
 * 클래스랑 클래스, 클래스랑 변수는 병합할 수 없다.
 * 클래스 병합을 흉내내려면 mixin 기법을 사용한다.
 */

/**
 * Module Augmentation
 * 자바스크립트 모듈이 병합을 지원하지 않더라도,
 * 존재하는 객체를 importing 하고 updating 할 수 있다.
 *
 * 새로운 선언을 만들어 선언 병합을 할 수는 없다.
 * default exports 는 증강시킬 수 없다.
 * 변경 불가능한 라이브러리에서 default exports 에
 * 프로퍼티를 추가하고 싶다면 아래 링크를 참조해서 방법을 찾아봐야 할 것 같다.
 * https://github.com/Microsoft/TypeScript/issues/14080
 *
 */
// global 증강을 하고 싶다면 이렇게 하면 된다.
// observable.ts
export class Observable<T> {
    constructor(public arr: Array<T>) {}
}
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
Array.prototype.toObservable = function () {
    return new Observable<typeof Array>(this);
};

const arr = [1, 2, 3];
console.log(arr.toObservable());
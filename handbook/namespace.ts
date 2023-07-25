export {}
/**
 * Validators in a single file
 */

namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string): boolean {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// 시도해볼만한 샘플
let strings = ["Hello", "98052", "101"];

// 사용할 검증자
let validators: { [s:string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// 각 문자열이 각 검증자를 통과하는지 확인
for (let s of strings) {
    for (let name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`"${s}" - ${isMatch ? "matches" : "does not match"} '${name}.'`);
    }
}

/**
 * Multi-file namespaces
 * namespace 폴더의 Test.ts 참조
 */

/**
 * Alias
 * @@@
 */
namespace Shapes {
    export namespace Polygons {
        export class Triangle {}
        export class Square {}
    }
}

import polygons = Shapes.Polygons;
// let sq = new Shapes.Polygons.Square() 와 같다
let sq = new polygons.Square();

/**
 * @@@
 * Ambient Namespaces
 * 유명한 라이브러리인 D3 의 경우 그 기능을 하는 전역 객체를 d3 라고 정의한다.
 * 이 라이브러리는 <script> 태그를 통해 로딩되어야 하므로(모듈 로더 대신에),
 * 형태를 정의하기 위해 namespace 를 사용한다.
 * 타입스크립트 컴파일러가 이 모양을 보려면 '주변의 네임스페이스 선언' 을 사용한다.
 */
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
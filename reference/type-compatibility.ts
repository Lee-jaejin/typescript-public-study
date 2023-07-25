
/**
 * Type Compatibility
 * 타입 호환성
 *
 * Advanced Topics
 * 고급 주제
 * Subtype vs Assignment
 * 하위 타입 vs 할당
 * 할당 호환성은 잘 이해가 안됨.
 * @@@
 * 할당은 하위 타입의 호환성을 확장하여 any 에서의 할당과
 * enum 과 해당 숫자 값의 할당을 허용하는 규칙을 가진다는 점만 다름.
 */

let a: object
let b: void

// object 는 void 에 할당할 수 없음
a = b;
// b = a; // 실패

let c: never;
let d: never;
c = d;
// c = a;
// c = b;
b = c;
a = c;
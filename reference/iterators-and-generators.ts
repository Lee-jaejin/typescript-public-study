export {}
/**
 * Iterables
 * Symbol.iterator 를 구현체로 갖는 object 를 iterable 이라고 간주한다.
 * Array, Map, Set, String, Int32Array, Uint32Array
 * 등과 같은 빌트인 타입들은 Symbol.iterator 프로퍼티가 구현되어 있다.
 * Symbol.iterator 함수는 해당하는 object 의 iterate 가능한 리스트의 값들을 반환해야 한다.
 */

/**
 * `Iterable` interface
 */
function toArray<X>(xs: Iterable<X>): X[] {
    return [...xs];
}

/**
 * `for..of` statements
 * `for..of` 는 Symbol.iterator 함수를 호출하여 해당 객체의 프로퍼티를 부르고,
 * 이를 반복한다.
 */
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry);
}

/**
 * `for..of` vs `for..in` statements
 * `for..of` 는 값을 반환하고
 * `for..in` 은 키를 반환한다
 */
let list = [{
    testName: "test name1",
    testKey: "test key1"
}, 5, 6];

for (let i in list) {
    console.log(i);
}

for (let i of list) {
    console.log(i);
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
// @ts-ignore
pets["species"] = "mammals";

console.log('=====pets===== in');
// in 은 키에 관심이 있기 때문에 species 만 반환하고
for (let pet in pets) {
    console.log(pet);
}

console.log('=====pets===== of');
// of 는 값에 관심이 있기 때문에 'Cat', 'Dog', 'Hamster' 를 반환함
for (let pet of pets) {
    console.log(pet);
}
console.log(pets)
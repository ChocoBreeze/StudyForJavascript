const log = console.log;
// Array.from() : 배열이 아닌 객체를 받아서 실제 배열로 변환해 반환
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

// Array.of() : 전달받은 모든 인수로 배열 생성
const digits = Array.of(1,2,3,4,5);
log("digits", digits);

// Array.find() : 만족하는 첫 원소 반환
let found = digits.find(e=>e >3);
log("found",found)

// Array.findIndex() : 만족하는 첫 원소의 인덱스 반환
let found_index = digits.findIndex(e=>e >3);
log("found_index",found_index)

// Array.some() : 하나라도 조건 만족하면 true
// Array.every() : 모두 다 조건 만족해야 true
const array = [1,2,3,4,5,6,1,2,3,1];

let arraySome = array.some(e=>e>2);
log(arraySome); // true

let arrayEvery = array.every(e=>e>2);
log(arrayEvery); // false
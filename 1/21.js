// 1. Array.prototype.flat(), Array.prototype.flatMap()
// 2. Object.fromEntries()
// 3. String.prototype.trimStart(), String.prototype.trimEnd()
// 4. 선택적 catch 할당
// 5. Function.prototype.toString()
// 6. Symbol.prototype.description
const log = console.log;

// 1. Array.prototype.flat(), Array.prototype.flatMap()
// Array.prototype.flat() : 지정한 깊이까지 배열을 재귀적으로 flatten(평면화)하기.
// default 깊이 인수 = 1
// Infinity로 지정하면 모든 중첩 배열을 평면화 가능함.

const letters = ['a','b',['c','d',['e','f']]];

// 깊이 1(기본값) 평면화
log(letters.flat());

// 깊이 2 평면화
log(letters.flat(2));

// 깊이 1 평면화를 두 번 수행.
log(letters.flat().flat());

// 중첩된 배열이 모두 없어질 때까지 평면화
log(letters.flat(Infinity));

// Array.prototype.flatMap() : .flat()과 동일한 방식으로 깊이 인수를 처리하지만 단순히 배열을 평면화하는 대신 새로운 값으로 매핑되어 생긴 배열을 평면화한다.
let greeting = ["Greetings from", " ", "Vietnam"];

// 일반 map() 함수를 사용
log(greeting.map(x => x.split(" "))); // 배열이 중첩된 결과 : [ [ 'Greetings', 'from' ], [ '', '' ], [ 'Vietnam' ] ]

log(greeting.flatMap(x => x.split(" "))); // 평면화 가능 : [ 'Greetings', 'from', '', '', 'Vietnam' ]


// 2. Object.fromEntries()
// Object.fromEntries()는 키/값 쌍이 포함된 배열을 객체로 변환함.
// 배열, 맵 등의 이터러블 프로토콜을 구현하는 객체라면 무엇이든 Object.fromEntries()의 인수로 전달 가능하다.
// iterable protocol이 iteration protocol을 의미하는 것인가?..
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols
const keyValueArray = [
    ['key1', 'value1'],
    ['key2','value2'],
];

const obj = Object.fromEntries(keyValueArray);
log(obj); // { key1: 'value1', key2: 'value2' }


// 3. String.prototype.trimStart(), String.prototype.trimEnd()
// trimStart() : 문자열 시작 부분의 공백 제거 - 별칭으로 trimLeft()를 사용할 수 있음
// trimEnd() : 문자열 끝 부분의 공백 제거 - 별칭으로 trimRight()를 사용할 수 있음

let str = "    this string has a lot of whitespace   ";
log("str =", str);
log("length =", str.length);

str = str.trimStart();
log("str =", str);
log("length =", str.length);

str = str.trimEnd();
log("str =", str);
log("length =", str.length);

// 결과
// str =     this string has a lot of whitespace
// length = 42
// str = this string has a lot of whitespace
// length = 38
// str = this string has a lot of whitespace
// length = 35


// 4. 선택적 catch 할당
// ES2019 이전에는 catch 절에 항상 예외 변수를 포함했어야 했으나, ES2019에서는 이를 생략가능하다.
// 왜 필요한가? -> 오류를 무시하고자 할 때 유용하다.
// https://2ality.com/2017/08/optional-catch-binding.html 참고.
try {

} catch {

}
// 도 가능하다.


// 5. Function.prototype.toString()
// 함수 객체의 .toString() 메서드는 함수의 소스 코드를 나타내는 문자열을 반환한다.
// ES2016까지는 소스 코드에서 주석이나 공백 문자를 제거했지만, ES2019에서 개정되어 해당 문자열에는 주석 등도 포함된다.
function sum(a,b) {
    // 합계를 구하는 함수.
    return a+b;
}

log(sum.toString());

// 결과
// function sum(a,b) {
//     // 합계를 구하는 함수.
//     return a+b;
// }


// 6. Symbol.prototype.description
// 심벌 객체의 description은 해당 심벌 객체의 설명을 반환한다.
const me = Symbol("Alberto");
log(me.description); // "Alberto";

log(me.toString()); // Symbol(Alberto)


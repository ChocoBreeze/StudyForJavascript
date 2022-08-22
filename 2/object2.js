// 기본 자료형 : 실체가 있는 것(undefined와 null 등이 아닌 것) 중에 객체가 아닌 것을 기본 자료형(primitive types, primitives)라고 함
// 숫자, 문자열, 불이 이에 속함.

const log = console.log;
// 기본 자료형을 객체로 선언하기
const f = new Number(273)
log(typeof f) // object
f.sample = 10
log(f.sample) / 10
log("f", f) // 
// 기본 자료형의 경우에도 일시적으로 기본 자료형을 객체로 승급시킨다 -> 속성과 메서드를 사용할 수 있는 것, 그러나 일시적이므로 실제로는 추가되지 않음.
// prototype 객체에 속성과 메서드를 추가하면 모든 객체(와 기본 자료형)에서 해당 속성과 메서드를 사용할 수 있다.

Number.prototype.power = function (n = 2) {
    return this.valueOf() ** n
}

const a = 12
log('a.power() : ', a.power()) // 144
log('a.power(3) : ', a.power(3)) // 1728
log('a.power(4) : ', a.power(4)) // 20736

// Number
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number
// .toFixed() : 소수점 n번째 자리수까지 출력
// isNaN() : Not a Number인지 확인
// isFinite() : 무한인지 확인

// String
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
// .trim() : 문자열 양쪽 끝의 공백 없애기
// .split() : 문자열을 특정 기호로 자르기

// JSON(JavaScript Object Notation - 자바스크립트의 객체처럼 자료를 표현하는 방식) 객체
// 값 표현 = 문자열, 숫자, 불 자료형만 가능.
// JSON.stringify() : 자바스크립트 객체 -> JSON 문자열.
// JSON.parse() : JSON 문자열 -> 자바스크립트 객체.

// Math
// 랜덤한 숫자
const num = Math.random(); // 0 ~ 1 사이의 랜덤한 숫자
log(num);


// 다른 library
// lodash : https://www.npmjs.com/package/lodash
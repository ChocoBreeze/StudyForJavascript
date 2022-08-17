const log = console.log;

// call back 함수 : 매개변수로 전달하는 함수
function callThreeTimes (callback) { // callback은 함수이므로 호출 가능 -> 함수가 아닌 다른 매개변수가 오는 경우에 보호할 수 있을까? -> 호출 전에 확인하면 될 듯.
    for(let i=0;i<3;++i) {
        callback(i)
    }
}

function print (i) {
    log(`${i}번째 함수 호출`)
}

callThreeTimes(print)
// 익명 함수
callThreeTimes(function (i) {log(`${i}번째 함수 호출`)})

// 콜백 함수를 활용하는 함수들
// 1. forEach
// 배열이 갖고 있는 메서드로써 단순하게 배열 내부의 요소를 사용해서 콜백 함수를 호출해 줌.
// function (value, index, array) {}의 형태를 사용함.
const numbers = [273, 52, 103, 32, 57]

numbers.forEach(function (value, index, array) { // 매개변수로 value, index, array를 갖는 콜백 함수를 사용함.
    log(`${index}번째 요소 : ${value}`)
})

// 2. map() : 콜백 함수에서 리턴한 값들을 기반으로 새로운 배열을 만드는 함수
let numbers_square = numbers.map(function (value, index, array) {
    return value * value;
})
// log(numbers_square)
numbers_square.forEach(log);

// 3. filter() : 콜백 함수에서 리턴하는 값이 true인 것들만 모아서 새로운 배열을 만드는 함수
const even_numbers = numbers.filter(function (value) { // value만 필요하니 value만 이용
    return value %2 ==0
})
log("even_numbers", even_numbers)

// 화살표 함수 : 단순한 형태의 콜백 함수를 쉽게 입력하고자 arrow function라는 함수 생성 방법!
// (매개변수) => {} 형태임. (매개변수) => 리턴값
numbers_square = numbers.map((value) => value * value)
log(numbers_square)

// method chaining : 메소드가 리턴하는 값을 기반으로 해서 함수를 줄줄이 사용하기.
let num_method_chaining = numbers.filter((value) => value%2 ===0 ).map((value) => value * value).forEach((value)=> {log(value)})


// 타이머 함수 : 특정 시간마다 또는 특정 시간 이후에 콜백 함수를 호출할 수 있는 함수들.
// 1. setTimeout(함수, 시간) : 특정 시간 후에 함수를 한 번 호출함. -> 종료 : clearTimeout
// 2. setInterval(함수, 시간) : 특정 시간마다 함수를 호출함. -> 종료 : clearInterval
setTimeout(() => {
    log('1초 후에 실행됩니다.')
}, 1000)

let count = 0;
let id = setInterval(() => {
    log(`1초마다 실행됩니다(${count}번째)`)
    count++;
}, 1000)

setTimeout(() => {
    log('타이머를 종료합니다.')
    clearInterval(id)
}, 5000)

// 즉시 호출 함수 : (function () {}) ()
/*
익명 함수를 생성하고 곧바로 즉시 호출하는 패턴을 많이 볼 수 있음.
변수 이름이 충돌할 수 있는 경우가 많음. -> 자바스크립트는 scope에 따라 변수 충돌 가능
중괄호를 사용해서 블록을 만들거나 함수를 생성해서 블록을 만드는 방식으로 scope 단계를 변경 가능
블록이 다른 경우 내부 변수가 외부 변수를 가리는 현상을 shadowing이라고 함.
구 버전의 자바스크립트의 경우 var 키워드를 사용 -> 중괄호 블록으로는 해결 못 함.(함수 블록 필요 -> 익명 함수 즉시 호출 이용) 
*/

// 엄격 모드
/*
코드 가장 위쪽에 use strict
참고 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode
JavaScript 모듈의 전체 컨텐츠는 엄격 모드 시작을 위한 구문 없이도 자동으로 엄격모드임
*/

// 익명 함수와 선언적 함수의 차이
/* 
익명 함수의 사용 : 순차적은 코드 실행에서 코드가 해당 줄을 읽을 때 생성
선언적 함수 : 순차적은 코드 실행이 일어나기 전에 생성됨. -> 같은 블록이라면 어디에서 함수를 호출해도 상관 없음.
익명 함수는 코드를 읽을 때와 같은 순서로 함수가 선언되지만, 선언적 함수는 우리가 코드를 읽는 순서와 다른 순서로 함수가 선언됨.
함수를 같은 이름으로 덮어쓰는 것은 굉장히 위험한 일로, 안전하게 사용할 수 있는 익명 함수를 더 선호함.
자바스크립트의 경우 블록이 예상하지 못하게 나뉠 수 있기 때문에 익명 함수를 더 많이 사용함.
var 키워드는 덮어쓰는 문제가 발생함. -> let, const를 이러한 위험한 원천적으로 차단하기 위해 오류를 발생시킴.
선언적 함수, 익명 함수 중 한 가지로 통일해서 사용하는 것이 오류의 위험을 줄일 수 있고, 통일한다면 익명 함수로 통일해서 사용하는 것이 안전을 위해서 더 편한 선택임.
*/
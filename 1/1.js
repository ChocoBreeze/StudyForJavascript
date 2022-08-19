const log = console.log;
// var : var 키워드로 선언된 변수는 함수 스코프에 종속됨.(블록 스코프 내에서 var 키워드로 변수를 선언하면 이 변수를 for 루프 밖에서도 사용할 수 있다.)
// let, const : 키워드로 선언된 변수는 블록 스코프로 종속됨, 즉 변수가 선언된 블록과 그 하위 블록 내에서만 사용할 수 있다.
// const의 경우 재할당을 통해 값이 변경될 수 없고, 다시 선언될 수도 없다.
// const에 객체가 담긴 경우?
const person = {
    name : "Alberto",
    age : 25,
};
person.age = 26;
log(person.age); // 26
// 변수 전체를 재할당하는 것이 아니라 그 속성 중 하나만 재할당하는 것이므로 문제가 없다.
// 객체의 내용을 변경할 수 없게 const 객체를 고정하는 것도 가능하다.
Object.freeze(person);
person.age = 30;
log(person.age); // 26

/*
TDJ(temporal dead zone)
var : 정의되기 전에 접근 가능(undefined)하지만 값에는 접근할 수 없음.
let, const : 정의하기 전에 접근할 수 없음.
let은 변수가 선언될 때까지 일시적으로 비활성 구역, TDZ에 있게 됨 - 초기화 전에 변수 접근 시 오류 발생.
hoisting : https://developer.mozilla.org/ko/docs/Glossary/Hoisting

Mathias Bynes
- 기본적으로 const를 사용
- 재할당이 필요한 경우에만 let을 사용
- var은 ES6에서 절대 사용 x

Kyle Simpson
- 여러 큰 스코프에서 공유하기 위한 최상위 변수에는 var 사용
- 작은 스코프의 로컬 변수에는 let을 사용
- 코드 작성이 어느 정도 진행된 후에만 let을 const로 리팩터링. 
    변수 재할당을 막아야 하는 경우라는 것이 확실할 때만

*/


console.log(i); // undefined라고 출력
var i = "I am a variable";

// console.log(j); // error(실행되지 x)
let j = "I am a let";


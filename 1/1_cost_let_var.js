// const, let, var
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


console.log(i); // undefined
var i = "I am a variable";

console.log(j); // error
let j = "I am a let";


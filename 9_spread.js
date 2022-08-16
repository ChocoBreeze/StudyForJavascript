// <9> spread syntax
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax
const log = console.log;

// 배열의 결합
const veggie = ["tomato", "cucumber", "beans"]
const meat = ["pork", "beef", "chicken"]

const menu = [...veggie, "pasta", ...meat]
log(menu);

// 배열의 복사
// 배열 할당 후 내부에 스프레드 연산자를 통해 veggie 변수의 모든 원소 넣기
const newVeggie = [...veggie]; 
veggie.push("peas");
log("veggie", veggie);
log("newVeggie", newVeggie);

// 함수 호출
function doStuff (x,y,z) {
    log(x+y+z);
}
let args = [0,1,2];
let args_ = [0,1,2,3];
doStuff.apply(null, args); // 기존
doStuff(...args); 
doStuff(...args_); // 개수 더 많아도 마지막 매개변수는 제외됨

// object literal and spread (ES2018)\
// 객체에 대한 스프레드 연산자
let person = {
    name : "Alberto",
    surname : "Montalesi", 
    age: 25,
};

let clone = {...person};
console.log("clone", clone);

// rest 문법
// spread는 배열을 '확장', rest는 여러 원소를 하나의 원소로 '압축'
const runners = ["Tom", "Paul", "Mark", "Luke"]
const [first, second, ...losers] = runners;
log("...losers", ...losers); // 확장
log("losers", losers) // 배열 하나로


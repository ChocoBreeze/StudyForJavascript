// <2> arrow function
// Window 객체. : https://kssong.tistory.com/29
var greeting = function(name) { // ES5에서 함수 선언
    return "hello " + name;
}

var greeting = (name) => { // 화살표 함수 문법
    return `hello ${name}`;
}

var greeting = name => { // parameter 1개인 경우 괄호 생략 가능
    return `hello ${name}`;
}

var greeting = () => { // no parameter
    return "hello";
}

var greeting = name => `hello ${name}`; // 명시적인 반환 생략 가능
// 화살표 함수는 익명 함수. 참조할 이름이 필요하다면 함수를 변수에 할당 가능

// 객체 리터럴 암시적 반환
const race = "100m dash";
const runners = ["Usain Bolt", "Justin Gatlin", "Asafa Powell"];

// map을 이용한 runners 배열에 대한 iteration 구현.
// runner = 현재 원소, i = 배열의 인덱스
// 중괄호 안에 있는 것이 암시적으로 반환하려는 객체 리터럴임을 자바스크립트에 알리려면
// 전체를 괄호 안에 감싸야 함.
const results = runners.map((runner, i) => ({name : runner, race, place : i+1}));

console.log(results);

// 화살표 함수를 사용할 때 this 키워드는 상위 스코프에서 상속됨.

// 화살표 함수를 피해야 하는 경우
// 1.
const person1 = {
    age:10,
    grow: function() {
        this.age++;
        console.log(this.age);
    },
};

person1.grow(); // 11

const person2 = {
    age:10,
    grow: () => { // 화살표 함수
        // 오류 : 여기서 this는 Window 객체를 가리킴
        this.age++;
        console.log(this.age); // NAN
    }
}

person2.grow();

// 2.
function example() {
    // arguments는 변수 이름이 아닌 키워드
    console.log(arguments[0]); // 매개변수에 접근 가능
}
example(1,2,3); // 1

// this와 유사하게, 화살표 함수에서 arguments 객체는 부모 스코프의 값을 상속함.

const showWinner = () => {
    const winner = arguments[0];
    console.log(`${winner} was the winner`);
}

// <2>
// 화살표 함수로 arguments 접근하기
const showWinner_args = (...args) => {
    const winner = args[0];
    console.log(`${winner} was the winner`);
}

showWinner("Usain Bolt", "Justin Gatlin", "Asafa Powell") // [object Object] was the winner
showWinner_args("Usain Bolt", "Justin Gatlin", "Asafa Powell") // Usain Bolt was the winnder
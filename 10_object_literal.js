// <10> 객체 리터럴 표기 개선
const log = console.log;
const name = "Alberto";
const surname = "Montalesi";
const age = 25;
const nationality = "Italian";

// ES6
// 변수 이름이 코드 내의 속성과 동일 -> 코드 내에서 굳이 두번 안 써도 된다.
const person1 = {
    // 기존 -> name : name
    name,
    surname,
    age,
    nationality,
}
log(person1);

// 객체에 함수 추가
const person2 = {
    name: "Alberto",
    // 기존 -> greet: function() {}
    greet() {
        log("Greet");
    },
    // 익명 함수 (함수에 접근하기 위한 키가 필요)
    hello : () => console.log("Hello"),
}
person2.greet();
person2.hello();

// 객체의 속성을 동적으로 정의하기
const name2 = "myname";
var person_ES5 = {}; // 빈 객체 생성
person_ES5[name2] = "Alberto"; // 객체를 업데이트

const person_ES6 = {
    [name2] : "Alberto",
};

log(person_ES5.myname);
log(person_ES6.myname);
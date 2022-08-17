// loop
// for of (ES6 ~)
const log = console.log;
log("for of")
const fruits = ['apple', 'banana', 'orange'] // 1. 배열
for(const fruit of fruits) {
    log(fruit);
}

const car = {
    maker: "BMW",
    color: "red",
    year: "2010",
}; // 2. 객체
// 객체 접근 -> car.maker or car['maker']
for(const prop of Object.keys(car)) { // Object.keys : 객체의 모든 키를 가져 온다
    const value = car[prop];
    log(prop, value);
}
// Object.entries() : 객체의 모든 키 값 쌍을 가져 온다 -> 각 키/값 쌍에 대해 수행

// for in : 순서 없이 객체의 모든 열거 가능한 속성을 반복
// 반복 중에는 객체의 속성을 추가, 수정, 삭제하지 않는 것이 좋다.(언제 접근할지 모름)
log("for in")
for(const prop in car) {
    log(prop, car[prop])
}

// 차이 비교
let list = [4,5,6];
// 배열도 객체 -> 배열 객체에서 인덱스 번호는 숫자 속성 -> 열거 가능
// 배열은 열거 가능하면서 동시에 이터러블 프로토콜을 구현하고 있기 때문에 반복 가능함.
for(let i in list) { // 키의 목록을 반환(배열의 속성 목록 - 인덱스)
    log(i); // "0", "1", "2"
}
for (let i of list) { // 값을 반환(배열의 원소 목록)
    log(i); // 4, 5, 6
}
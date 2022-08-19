// 기본 내용

const log = console.log;

// var, let, const -> 1번에서 자세히 다룬다.

// 변수 명명법.
// 숫자로 시작할 수 없으며, 공백, 기호, 마침표가 들어갈 수 없다. + 예약어도 사용할 수 없다(변수나 함수의 이름으로)

// 자료형
// Javascript : 동적 언어(dynamic language) - 정적 언어와 달리 변수를 정의할 때 자료형을 정의할 필요가 없다.
// 원시 자료형 : 객체가 아닌 자료형으로 메서드를 가지지 않음. (string, number, boolean, null, undefined, symbol 등이 해당함)
// 객체(object) : 여러 속성의 모음을 저장하는 데 사용 가능함.(키/값 쌍에 데이터를 저장함)


// 빈 객체 생성 - 2가지 방법
const tmp = new Object(); // 1
const car = {}; // 2
car.color = 'red'; // 속성 추가
// 속성 접근 - 2가지
log(car.color); // red
log(car['color']);  // red
// 대괄호 접근만 가능 : 여러 단어로 된 속성을 사용하려는 경우 + 다른 변수의 값을 키로 써야 하는 경우.
let key = 'color'; 
log(car[key]); // red


// 객체의 복사 - 참조 방식을 사용함. (shallow copy)
let car_copy = car;
car_copy.color = 'black';
log("car", car); // black
log("car_copy", car_copy); // black
log(car == car_copy) // true
log(car === car_copy) // true

const obj1 = {a:1};
const obj2 = {a:1};
log(obj1==obj2) // false
log(obj1===obj2) // false
// 동일한 객체를 비교할 때만 true를 출력함.

// 진짜 복사 (deep copy) - Object.assign()
// 참고 : https://www.digitalocean.com/community/tutorials/copying-objects-in-javascript
car.color = 'red';
car_copy = Object.assign({}, car);
car_copy.color = 'black';
log("car", car); // red
log("car_copy", car_copy); // black
log(car == car_copy) // false
log(car === car_copy) // false

// 배열
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
const fruitBasket = ['apple', 'banana', 'orange'];
log(fruitBasket.length); // 3
fruitBasket.push('pear'); // 끝에 원소 추가
log(fruitBasket);
fruitBasket.unshift('melon'); // 앞에 원소 추가
log(fruitBasket);
fruitBasket.pop(); // 마지막 원소 제거
log(fruitBasket);
fruitBasket.shift(); // 첫 원소 제거
log(fruitBasket);

// typeof : 자료형 확인하기
const str = "hello";
log(typeof str); // string
const num = 12;
log(typeof num); // number
const arr = [1,2,3];
log(typeof arr); // object
const obj = {prop: 'value'};
log(typeof obj); // object
log(typeof null); // object -> https://2ality.com/2013/10/typeof-null.html


// 함수
// 1. 기본적인 함수 정의
function greet(name) {
    log("hello " + name);
};
greet("Alberto"); // hello Alberto
// 원시 자료형이 함수에 전달될 때는 참조가 아니라 값의 형태로 전달된다. (원래 값에는 함수의 결과가 반영되지 않음)
// 원시 자료형이 아닌 객체나 배열을 함수에 전달할 때는 참조로 전달 -> 원본에도 변경사항이 반영됨.
// 2. function expression(함수 표현식)을 사용하기
const greeter = function greet(name) {
    log("hello " + name);
};
greeter("Alberto"); // hello Alberto

// 3. anonymous function.
const greeter_anonymous = function(name) {
    log("hello " + name);
};
greeter_anonymous("Alberto"); // hello Alberto

// 4. arrow function(from ES6) -> 2장에서 상세히
const greeter_arrow_func = (name) => {
    log("hello " + name);
};
greeter_arrow_func("Alberto"); // hello Alberto


// 함수 스코프와 this 키워드의 이해.
// 변수의 scope : 변수에 접근할 수 있는 위치를 제어.
// global scope를 가지는 변수는 코드의 어느 곳에서나 접근 가능
// block scope를 가지는 변수는 변수가 선언된 블록 내부에서만 접근 가능함.
// block : 함수, 루프, 혹은 중괄호({})로 구분되는 모든 영역을 의미한다.
var myInt = 1;
if(myInt === 1) {
    var MySecondInt = 2;
    log(MySecondInt); // 2
}
log(MySecondInt); // 2
// var : 블록 스코프를 가지지 않기 때문에 블록 외부에서도 접근 가능
if(myInt === 1) {
    let MySecondInt_l = 2;
    log(MySecondInt_l); // 2
}
// log(MySecondInt_l) // is not defined
// let, const : 선언된 위치에 해당하는 블록 스코프를 가짐.(블록 스코프 외부에서 변수에 접근할 수 없음)


// this 키워드
const myCar = {
    color: 'red',
    logColor: function() {
        log(this.color);
    },
};
myCar.logColor(); // red

function logThis() {
    log(this);
}
// logThis(); // Window 객체라는 결과가 일반적인 결과
// nodejs 환경에서는 Window 객체는 아닌듯함.

// strict mode를 설정하면 실수로 Window 객체를 참조하는 것을 방지할 수 있음.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode
// 파일의 시작 부분에 use strict;를 삽입하면 됨 -> 전역 객체의 값을 Window 대신에 undefined로 설정함.

// this값을 수동으로 설정할 때는 .bind()를 사용할 수 있음.
const unboundGetColor = myCar.logColor;
unboundGetColor(); // undefined - 전역 객체에는 .color가 없다.
const boundGetColor = unboundGetColor.bind(myCar); // this가 myCar를 참조함을 알린다.
boundGetColor(); // red

// this 키워드의 값을 설정하는 데 사용할 수 있는 또 다른 방법
// 1. .call() : 인수의 목록을 받는다
// 2. .apply() : 하나의 인수 배열을 받는다
// 두 메서드 모두 주어진 this의 값으로 함수를 호출한다는 점에서 비슷하지만 받아들이는 인수가 약간 다르다.

function Car(maker, color) {
    this.carMaker = maker;
    this.carColor = color;
}

function MyCar(maker, color) {
    // Car.call(this, maker, color); // .call : 인수의 목록을 받음
    Car.apply(this, [maker,color]); // .apply : 인수 목록이 담긴 배열을 받음
    this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
log(myNewCar.carMaker); // bmw
log(myNewCar.carColor); // red

// 함수에 필요한 인수의 수를 모르거나 알 필요가 없을 때에는 .apply()를 주로 쓴다.
// .apply()는 배열을 전달할 수 있고, 배열에 포함된 원소의 수에 관계없이 함수 내부로 전달할 수 있다.
const ourFunction = function(item, method, args) {
    method.apply(args);
}
ourFunction(item, method, ['argument1', 'argument2']);
ourFunction(item, method, ['argument1', 'argument2', 'argument3']);
// 전달하는 인수의 수에 관계없이 .apply()가 호출될 때 개별적으로 각 인수가 적용된다.
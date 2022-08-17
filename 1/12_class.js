// class
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
// 클래스는 일차적으로 자바스크립트의 기존 prototype 기반 상속에 대한 syntax sugar
// 클래스 문법이 자바스크립트에 새로운 객체 지향 상속 모델을 도입하는 것은 아님
const log = console.log;

// 1. 프로토 타입 상속
// 아래 내용이 상속을 의미하는 건가?
function Person_proto(name, age) {
    this.name =name;
    this.age = age;
}

Person_proto.prototype.greet = function() {
    log("Hello, my name is " + this.name);
}

const alberto_proto = new Person_proto("Alberto", 26);
const caroline_proto = new Person_proto("Caroline", 26);

alberto_proto.greet(); // Hello, my name is Alberto
caroline_proto.greet(); // Hello, my name is Caroline

// 클래스 생성
// 두가지 방법 1.클래스 선언 2. 클래스 표현식
// 클래스 선언
class A {

}

// 클래스 표현식
const b = class B {

};

// JavaScript에서 호이스팅(hoisting)이란, 
// 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다.
// 클래스 선언 및 클래스 표현식은 hoisting되지 않음.
// 클래스에 접근하기 전에 클래스를 선언하지 않으면 ReferenceError가 발생함.
// 클래스에 생성자 메서드가 두 개 이상 포함된 경우 SyntaxError

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        log(`Hi, my name is ${this.name} and I'm ${this.age} years old`)
    }
    farewell() {
        log("goodbye friend");
    }
    // 클래스의 인스턴스가 아닌 클래스 자체에서 접근가능한 정적 메서드
    static info() {
        log("I am a Person class, nice to meet you");
    }
    // setter, getter 메서드를 사용하여 클래스 내에 값을 설정하거나 가져올 수 있음.
    set nicknames(value) {
        this.nickname = value;
        log(this.nickname);
    }
    get nicknames() {
        log(`Your nickname is ${this.nickname}`);
    }
}

// 상속
class Adult extends Person { // Person 클래스의 모든 속성과 메서드 상속.
    constructor(name, age, work) {
        super(name, age);
        this.work = work;
    }
}

const alberto = new Person("Alberto", 26);
alberto.greet(); // Hi, my name is Alberto and I'm 26 years old
alberto.farewell(); // goodbye friend
// alberto.info(); // TypeError.
Person.info();
alberto.nicknames = "Albi"; // 호출 방식이 좀 특이하네
alberto.nicknames; // Your nickname is Albi

const alberto_extends = new Adult("Alberto", 26, "software developer");

log("age :", alberto_extends.age);
log("work :", alberto_extends.work);
alberto.greet();

// 배열 확장하기
// 배열과 비슷하게 생겼지만, 첫 값은 교실 이름이고 
// 나머지는 학생 이름과 학생 점수를 나타내는 Classroom이라는 새로운 클래스
class Classroom extends Array {
    // 레스트 연산자를 사용해 가변 인수로 입력받은 학생들의 정보를
    // 배열 형태로 students에 할당
    constructor(name, ...students) {
        // 스프레드 연산자를 사용해 배열 원소들을 다시 풀어헤쳐 생성자 호출
        // 스프레드 연산자를 사용하지 않으면
        // '학생들의 정보가 들어 있는 배열'을 원소로 가진 Array가 생성될 것이다.
        super(...students);
        this.name = name;
    }
    add(student) { // 학생을 추가하기 위한 메서드
        this.push(student);
    }
}

const myClass = new Classroom('1A',
{name: "Tim", mark:6},
{name: "Tom", mark:3},
{name: "Jim", mark:8},
{name: "Jon", mark:10})

myClass.add({name: "Timmy", mark:7});
myClass[4]; // {name: "Timmy", mark:7}

for(const student of myClass) {
    log(student);
}
/*
// 1. 타입스크립트란?
자바스크립트는 강타입 언어가 아니므로 변수 선언 시 자료형을 정의할 필요가 없다.
-> 버그가 더 많이 발생할 수도 있다.
타입스크립트는 자료형을 명시하는 방식을 지원하고 일반 자바스크립트로 컴파일된다.
자료형이 있는 자바스크립트 상위집합(superset)이라고 볼 수 있음. -> 타입스크립트 파일에 일반 자바스크립트를 작성해도 되며 오류가 발생하지 않음.
브라우저는 타입스크립트를 이해하지 못하기 때문에 일반 자바스크립트로 transpile해야 한다.
traspile : https://ideveloper2.tistory.com/166, https://velog.io/@ckvelog/Compile-vs-Transpile

// 2. 타입스크립트 사용 방법
// 설치
// npm install -g typescript
// ~.ts 파일 만든 후 작성
// tsc ~.ts -> ~.js 생성
// node ~.js 실행
// 참고 : https://emoney96.tistory.com/265
// 참고 : https://hoho325.tistory.com/311

*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var log = console.log;
var greeter = function (name) {
    log("hello ".concat(name));
};
greeter('Alberto');
// name : string은 트랜스파일 후 자료형 선언이 제거됨(자바스크립트는 강타입 언어가 아님)
// 자료형을 명시하면 디버그하고 오류를 줄이는 데 도움이 된다.
// 최종적으로 동일한 자바스크립트 코드가 생성됨.
// 3. 타입스크립트 기본 자료형
// boolean, number, string, Array, object, tuple, enum, any, void, null과 undefined, never
var active = true;
var decimal = 9;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
var message = 'Welcome';
// Array 자료형을 정의하는 방법 = 2가지
// (1) type[]
var firstArray = [1, 2, 3];
// (2) Array<type>
var secondArray = [4, 5, 6];
// 숫자 자료형보다 더 복잡한 자료형이 사용될 경우 첫 번째 표기법은 이용할 수 없음
// label, value 속성을 가진 객체의 배열을 인수로 받는 함수
function ex(arg) {
    // do something...
}
// object
// 원시 자료형이 아닌 모든 자료형 값을 가리킴.
// Object : 자바스크립트 Object 클래스를 나타내는 자료형임.
function greetUser(user) {
    log("hello ".concat(user.name));
}
greetUser({ name: 'Alberto', age: 27 });
// 객체의 모든 속성을 명시적으로 지정한 덕분에 코드를 보는 모든 사람이 해당 객체로 무엇을 할 수 있고 무엇을 할 수 없는지 쉽게 알 수 있다.
// tuple
// 배열의 원소에 자료형을 정의 가능.
// 튜플에 정의된 인덱스의 자료형은 알고 있지만, 배열에 새롭게 추가되는 원소의 자료형을 알 수는 없다.
var myTuple;
myTuple = ['hi', 5, 'hello'];
log(myTuple);
// enum
// 숫자 집합에 이름 부여 가능
var Status;
(function (Status) {
    Status[Status["deleted"] = 0] = "deleted";
    Status[Status["pending"] = 1] = "pending";
    Status[Status["active"] = 2] = "active";
})(Status || (Status = {}));
;
var blogPostStatus = Status.active;
var Status2;
(function (Status2) {
    Status2[Status2["deleted"] = -1] = "deleted";
    Status2[Status2["pending"] = 0] = "pending";
    Status2[Status2["active"] = 1] = "active";
})(Status2 || (Status2 = {}));
;
var blogPostStatus2 = Status.active;
log(blogPostStatus); // 2
log(blogPostStatus2); // 1
log(Status[0]); // 숫자로 접근 deleted 
log(Status2[0]); // 숫자로 접근 pending
// any
// 특정 변수의 값이 무엇이든 될 수 있음을 의미함.
// 서드 파티 라이브러리가 타입스크립트를 지원하지 않는 경우, 또는 자바스크립트에서 기존 코드들을 활용하면서 부분적으로 타입스크립트를 적용할 때 사용할 수 있다.
// any는 존재하지 않을 수 있는 속성과 메서드에 접근할 수 있도록 허용한다.
// 자료형의 일부만 알고 있는 경우에도 any를 사용할 수 있다.
// https://velog.io/@njh7799/typescript-Object-vs-object-vs-
// 원본은 any가 아닌 Object<ant>라고 적혀 있음.
var firstUser = {
    name: 'Alberto',
    age: 27
};
var secondUser = {
    name: 'Caroline'
};
// 두 변수 모두 Object 자료형이 될 것으로 예상하지만, 그 속성이 확실하지 않으므로 any를 사용함.
// void
// 자료형이 없음을 정의함.
// 다음과 같은 시나리오에서 자주 사용됨
// 이 함수는 객체를 받아서 데이터베이스에 저장하지만 아무것도 반환하지 않기 때문에 반환값을 void로 지정함.
// void 자료형 변수를 선언할 때는 null과 undefined만 할당 가능함.
function storeValueInDatabase(objectToStore) {
    // 데이터베이스에 값을 저장
}
// null과 undefined
// null 및 undefined 값만 할당할 수 있기 때문에 그다지 유용하지 않음
// never
// 절대 발생하지 않는 값임. - 반환을 아예 하지 않거나 항상 오류를 발생시키는 함수에 사용할 수 있다.
function throwError(error) {
    throw new Error(error);
}
var greetingFunction; // 해당 인터페이스를 자료형으로 가지는 변수를 정의하기.
greetingFunction = function (greeting, name) {
    log("".concat(greeting, " ").concat(name));
    return "".concat(greeting, " ").concat(name);
};
greetingFunction('Bye', 'Alberto'); // 호출
// 클래스
// 타입스크립트에서 클래스는 ES6의 클래스와 매우 유사함.
// 프로토타입 상속을 수행하여 애플리케이션에서 재사용할 수 있는 구성 요소를 만들 수 있다.
// ES6 클래스와의 차이점은 타입스크립트를 사용하면 애플리케이션에서 클래스 멤버에 접근하는 권한을 설정할 수 있다는 점임.
// 자바스크립트에서도 private 지원함(ES2019) -> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields
// public : 공개(default)
// private : 비공개
// protected : 해당 클래스와 상속받은 클래스에서만 접근 가능
var Animal = /** @class */ (function () {
    function Animal() {
        this.eat = function () {
            log('gnam gnam');
        };
        this.sleep = function () {
            log('zzzz');
        };
    }
    return Animal;
}());
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.work = function () {
            log('...work...');
        };
        _this.sleep_new = function () {
            _this.sleep();
            // super.sleep(); // error TS2340: Only public and protected methods of the base class are accessible via the 'super' keyword. ??
            // error 나는데 js 코드는 생성됨. -> 확인 결과 error
        };
        return _this;
    }
    return Human;
}(Animal));
var me = new Human();
// me.work(); // 접근 x
me.eat();
me.sleep_new();
function person() {
    return { age: 27 };
}
var me1 = person();
log(me1.age); // ok
// 자료형이 달라도 동일한 이름의 속성을 가진다면 두 인터페이스를 결합할 때 컴파일러에서 오류 발생.
var me2 = {
    sex: 'male',
    age: 27,
    job: 'software developer'
};
log(me2);

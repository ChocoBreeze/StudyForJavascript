/* 
// 참고. https://typescript-kr.github.io/
// 참고. https://www.typescriptlang.org/docs/
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

const log = console.log;
const greeter = (name: string) => {
    log(`hello ${name}`);
}
greeter('Alberto')

// name : string은 트랜스파일 후 자료형 선언이 제거됨(자바스크립트는 강타입 언어가 아님)
// 자료형을 명시하면 디버그하고 오류를 줄이는 데 도움이 된다.
// 최종적으로 동일한 자바스크립트 코드가 생성됨.


// 3. 타입스크립트 기본 자료형
// boolean, number, string, Array, object, tuple, enum, any, void, null과 undefined, never
const active : boolean = true;

const decimal : number = 9;
const hex : number = 0xf00d;
const binary : number = 0b1010;
const octal : number = 0o744;

const message : string = 'Welcome';

// Array 자료형을 정의하는 방법 = 2가지
// (1) type[]
const firstArray: number[] = [1,2,3];
// (2) Array<type>
const secondArray : Array<number> = [4,5,6];

// 숫자 자료형보다 더 복잡한 자료형이 사용될 경우 첫 번째 표기법은 이용할 수 없음
// label, value 속성을 가진 객체의 배열을 인수로 받는 함수
function ex(arg : Array<{label : string ,value : string}>) {
    // do something...
}

// object
// 원시 자료형이 아닌 모든 자료형 값을 가리킴.
// Object : 자바스크립트 Object 클래스를 나타내는 자료형임.
function greetUser(user:{name : string, age : number}) { // 그냥 user : object로 넣으면 error Property 'name' does not exist on type 'object'.
    log(`hello ${user.name}`);
}
greetUser({name: 'Alberto', age : 27});
// 객체의 모든 속성을 명시적으로 지정한 덕분에 코드를 보는 모든 사람이 해당 객체로 무엇을 할 수 있고 무엇을 할 수 없는지 쉽게 알 수 있다.

// tuple
// 배열의 원소에 자료형을 정의 가능.
// 튜플에 정의된 인덱스의 자료형은 알고 있지만, 배열에 새롭게 추가되는 원소의 자료형을 알 수는 없다.
let myTuple: [string, number, string];
myTuple = ['hi', 5, 'hello'];
log(myTuple)

// enum
// 숫자 집합에 이름 부여 가능
enum Status {deleted, pending, active};
const blogPostStatus: Status = Status.active;

enum Status2 {deleted = -1, pending, active};
const blogPostStatus2: Status = Status.active;

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
let firstUser: any = {
    name: 'Alberto',
    age: 27,
};

let secondUser : any = {
    name: 'Caroline',
}
// 두 변수 모두 Object 자료형이 될 것으로 예상하지만, 그 속성이 확실하지 않으므로 any를 사용함.

// void
// 자료형이 없음을 정의함.
// 다음과 같은 시나리오에서 자주 사용됨
// 이 함수는 객체를 받아서 데이터베이스에 저장하지만 아무것도 반환하지 않기 때문에 반환값을 void로 지정함.
// void 자료형 변수를 선언할 때는 null과 undefined만 할당 가능함.
function storeValueInDatabase(objectToStore): void {
    // 데이터베이스에 값을 저장
}

// null과 undefined
// null 및 undefined 값만 할당할 수 있기 때문에 그다지 유용하지 않음

// never
// 절대 발생하지 않는 값임. - 반환을 아예 하지 않거나 항상 오류를 발생시키는 함수에 사용할 수 있다.
function throwError(error: string) : never { // 이 함수는 오류만 발생시키며 값을 반환하지 않음.
    throw new Error(error);
}


// 4. 인터페이스와 클래스
// interface를 통해 해당 변수가 가져야 하는 형태를 정의할 수 있음
// 인터페이스는 객체가 아니며, 인터페이스는 속성의 각 행 끝에 ,가 아닌 ;를 사용한다.
interface Car {
    readonly wheels : number; // readonly : 객체 생성 후 속성 편집 불가능.
    color : string;
    brand : string;
    coupe?: boolean; // optional property - 이 속성이 없어도 오류를 발생시키지 않음.
}
// 함수의 형태도 정의 가능함.
interface Greet { // 함수가 가진 형태를 인터페이스로 만든 후
    (greeting: string, name: string) : String
}
let greetingFunction: Greet; // 해당 인터페이스를 자료형으로 가지는 변수를 정의하기.

greetingFunction = (greeting:string, name:string):string => { // 그 변수에 정해진 형태의 함수를 만들어 할당.(형태가 다른 경우 오류 발생)
    log(`${greeting} ${name}`);
    return `${greeting} ${name}`;
}
greetingFunction('Bye', 'Alberto'); // 호출
// 인터페이스 확장 - 인터페이스는 다른 인터페이스를 상속받을 수 있음.
interface Vehicle {
    wheels: number;
    color: string;
}
interface Airplane extends Vehicle { // 총 4개의 속성을 가진다.
    wings: number;
    rotors: number;
}

// 클래스
// 타입스크립트에서 클래스는 ES6의 클래스와 매우 유사함.
// 프로토타입 상속을 수행하여 애플리케이션에서 재사용할 수 있는 구성 요소를 만들 수 있다.
// ES6 클래스와의 차이점은 타입스크립트를 사용하면 애플리케이션에서 클래스 멤버에 접근하는 권한을 설정할 수 있다는 점임.
// 자바스크립트에서도 private 지원함(ES2019) -> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields
// public : 공개(default)
// private : 비공개
// protected : 해당 클래스와 상속받은 클래스에서만 접근 가능
class Animal {
    public eat = () => {
        log('gnam gnam');
    };
    protected sleep = () => {
        log('zzzz');
    };
}

class Human extends Animal {
    private work = () => {
        log ('...work...');
    };
    sleep_new = () => { // default가 public인 듯
        this.sleep();
        // super.sleep(); // error TS2340: Only public and protected methods of the base class are accessible via the 'super' keyword. ??
        // error 나는데 js 코드는 생성됨. -> 확인 결과 error
    }
}
const me = new Human();
// me.work(); // 접근 x
me.eat();
me.sleep_new();



// 5. Union 자료형과 Intersection 자료형
// 참고 : https://typescript-kr.github.io/pages/unions-and-intersections.html
// union type
// const attendee = string | string[]; // An element access expression should take an argument.(에러 남)
// 이 변수는 문자열일 수도 있고, 문자열 배열일 수도 있다. -> 이렇게 정의하는 방식을 union type이라 함.
// '|'(pipe) 기호를 통해 각 자료형을 구분하며, 모든 자료형의 유니언의 공통 속성에만 접근할 수 있음을 기억하자.
interface Kid {
    age:number;
}
interface Adult {
    age : number;
    job:string;
}
function person() : Kid | Adult {
    return {age: 27};
}
const me1 = person();
log(me1.age) // ok
// log(me1.job) // error -  Property 'job' does not exist on type 'Kid'.

// intersection type
// 여러 자료형을 결합할 수 있음
interface Person {
    sex : 'male' | 'female' | 'N/A';
    age : number;
}
interface Employee {
    job: string;
}

type Adult_intersection = Person & Employee; // Person과 Employee 자료형을 결합.
// 자료형이 달라도 동일한 이름의 속성을 가진다면 두 인터페이스를 결합할 때 컴파일러에서 오류 발생.

const me2 : Adult_intersection = {
    sex : 'male',
    age : 27,
    job: 'software developer',
}
log(me2);


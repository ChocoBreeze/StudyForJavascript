// 1. 문자열 패딩
// 2. Object.entries()와 Object.values()
// 3. Object.getOwnPropertyDescriptors()
// 4. 후행 쉼표(trailing comma)
// 5. Atomics

const log = console.log;

// 1.
// 문자열 시작과 끝 부분에 padding을 추가하는 것이 가능
// padStart(), padEnd()
log("hello".padStart(6));
log("hello".padEnd(6));
// 6개만큼 padding을 추가하는 것이 아닌 6 - hello의 길이(5) = 1개 만큼 패딩 추가

// padStart() : 오른쪽 정렬이 가능해짐,
const strings = ["short", "medium length", "very long string"];

// 원래 코드
// const longestStringLength = strings.sort(str => str.length).map(str => str.length)[0]; // 오름차순 정렬임.
const longestStringLength = strings.sort((str1, str2) => str2.length - str1.length).map(str => str.length)[0];
// 가장 긴 문자열의 길이를 저장

log(longestStringLength);
strings.forEach(str => log(str.padStart(longestStringLength)));

// 문자열이나 숫자를 padding할 수도 있다.
log("hello".padEnd(13, " Alberto")); // hello Alberto
log("hello".padEnd(15, "Alberto")); // 반복해서 들어감 AlbertoAlberto...
log("1".padStart(3,0)); // "001"
log("99".padStart(3,0)); // "099"


// 2.
// 객체 내부의 값에 쉽게 접근하는 방법도 도입됨.
const family = {
    father : "Jonathan Kent",
    mother : "Martha Kent",
    son : "Clark Kent",
};

// 이전 버전의 객체 내부 접근
log(Object.keys(family)); // [ 'father', 'mother', 'son' ]
log(family.father); // Jonathan Kent
// Object.keys를 통해 key를 얻은 후 값에 접근해야 했다.
// 이제 다음과 같이 객체에 접근하는 방법이 두 가지 더 생겼다.
log(Object.values(family)); // [ 'Jonathan Kent', 'Martha Kent', 'Clark Kent' ] - 모든 값이 담긴 배열 반환
log(Object.entries(family)); // 키와 값을 모두 포함하는 배열의 배열을 반환함.


// 3.
// 객체가 소유한 모든 속성 설명자를 반환함.
// 속성의 value, writable, get, set, configurable, enumerable 등을 반환함
const myObj = {
    name : "Alberto",
    age : 25,
    greet() {
        log("hello");
    }
};
log(Object.getOwnPropertyDescriptors(myObj)); // 모든 객체
log(Object.getOwnPropertyDescriptor(myObj, 'name')); // 있다면 반환
log(Object.getOwnPropertyDescriptor(myObj, 'age'));
log(Object.getOwnPropertyDescriptor(myObj, 'greet'));
log(Object.getOwnPropertyDescriptor(myObj, 'nickname')); // 없으면 undefined

// 4.
// 사소한 문법 변경.
// 객체나 함수를 작성할 때 마지막 매개변수인지 여부에 관계없이 각 매개변수 뒤에 쉼표를 찍는 것이 허용됨.
// 자바스크립트는 처음부터 배열 리터럴에서 후행 쉼표를 허용했고,
// 객체 리터럴에 도입된 것은 ES5, 함수에도 도입된 것이 ES2017이다.
const object = {
    prop1: "prop",
    prop2: "propop",
};
// 마지막에 쉼표를 넣지 않아도 오류는 나지 않지만, 속성 추가나 변경 시 실수를 줄일 수 있으니 넣는 것이 좋다고 한다.
// 굳이?의 느낌.

// 5.
// 자바스크립트는 기본적으로 웹 브라우저 위에서 단일 스레드로 동작하지만,
// HTML5 web worker API 도입으로 백그라운드 스레드에서도 코드 실행이 가능해짐에 따라
// 멀티 스레드 환경을 지원하기 위해 공유 메모리 모델과 atomics가 도입되었다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Atomics
/*
메모리가 공유되었을때, 멀티쓰레드는 메모리안에 같은 데이터들을 읽거나 쓸 수 있습니다. 
Atomic operations은 예측 가능한 값을 쓰고 읽으며 다음 작업이 시작되기 전에 작업이 완료되고, 작업이 중단되지 않도록 합니다.

Atomic operations Atomic Module을 인스톨해야합니다. 
다른 global objects들과 다르게 Atomic은 constructor가 아닙니다. 
new operator를 사용하면 안되고 invoke Atomics object 함수로 사용하면 됩니다. 
Atomics의 모든 속성과 함수들은 static입니다. (as is the case with the Math object, for example). -> new operator를 쓸 수 없으며 함수 형태로 호출 불가능함.

Atomics는 범용 고정 길이 바이너리 데이터 버퍼를 표현하는 SharedArray Buffer 객체와 함께 사용된다.
*/

// Atomics.add(), Atomics.sub(), Atomics.load(), Atomics.store()
// Atomics.and(), Atomics.or(), Atomics.xor() : 모두 배열의 지정된 위치에 AND, OR, XOR 연산 수행

// Atomics.add()
// 3개의 인수 - 배열, 인덱스, 값을 받고, 더하기를 수행하기 전에 해당 인덱스에 존재하던 이전 값을 반환한다.
const buffer = new SharedArrayBuffer(16); // 매개변수 : 배열의 크기 (바이트)
const uint8 = new Uint8Array(buffer);

// SharedArrayBuffer : 고정된 길이의 원시 바이너리 데이터 버퍼를 표현(ArrayBuffer 객체와 유사하지만, 공유된 메모리상의 뷰를 생성하는데 사용할 수 있음)
// ArrayBuffer와 달리 SharedArrayBuffer는 분리 불가능.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer

// Uint8Array : an array of 8-bit unsigned integers.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

uint8[0] = 10; // 0번 인덱스에 값을 추가
log(Atomics.add(uint8,0,5)); // 10

log(uint8[0]); // 15
log(Atomics.load(uint8,0)); // 배열에서 특정 값 가져오기 (배열, 인덱스) - 15

log(Atomics.store(uint8, 1, 3)); // uint8[1] = 3; 00000011
log(Atomics.sub(uint8,1,5)); // 3
log(Atomics.load(uint8,1)); // 254 : 11111110

// Atomics.sub()
// Atomics.add()와 같은 방식으로 동작. 빼기를 수행.
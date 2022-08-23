// ES2020
// 모든 브라우저가 이러한 기능을 지원하는 것은 아님 -> 최신 버전의 크롬 또는 파이어폭스 필요.
// 해당 기능이 지원되지 않는 프로젝트에서 사용하려면 Babel 같은 컴파일러가 필요함.
// Babel 같은 컴파일러를 사용하면 버전 7.8부터 기본적으로 ES2020을 지원하므로 그 밖의 플러그인을 사용할 필요는 없음.
// Babel 컴파일러 설명 : https://www.daleseo.com/js-babel/

// 1. BigInt
// 2. 동적으로 가져오기
// 3. Optional Chaining.
// 4. Promise.allSettled()
// 5. null 계열의 값 병합하기
// 6. String.prototype.matchAll()
// 7. module namespace export 문법
// 8. import.meta
// 9. globalThis


const log = console.log;

// 1. BigInt
// 매우 큰 정수 저장.
// 기존 정수의 최대값 = 2^53 -1 = Number.MAX_SAFE_INTEGER = 9007199254740991;
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// https://www.smashingmagazine.com/2019/07/essential-guide-javascript-newest-data-type-bigint/
let num = Number.MAX_SAFE_INTEGER;
log(num); // 9007199254740991
log(num + 1); // 9007199254740992
log(num + 2); // 9007199254740992
log(num + 3); // 9007199254740994

// BigInt를 사용하기
// (1) BigInt 생성자
// (2) 큰 정수 뒤에 n을 붙이기.
let big1 = BigInt(900719925474099132423n); // 넣을 때도 n넣어서 넣어야 함.(안 그러면 잘림)
let big2 = 99999999999999999999n;
log(big1) // 900719925474099068928n
log(big2 + 1n); // 100000000000000000000n

// 2. 동적으로 가져오기
// 필요할 때 모듈을 동적으로 가져올 수 있음.
// 아래 코드처럼 런타임에서 모듈이 필요한지 여부를 판단해서 필요한 경우에만
// async, await를 사용해서 해당 모듈을 가져오는 게 가능해짐.

let condition1 = false;
let condition2 = true;
if (condition1 && condition2) {
    // const module = await import('./path/to/module.js'); // await is only valid in async functions and the top level bodies of modules -> .mjs 이용
    module.doSomething();
}


// 3. Optional Chaining.
const user1 = {
    name: 'Alberto',
    age: 27,
    work: {
        title: 'software developer',
        location : 'Vietnam',
    },
};

const user2 = {
    name: 'Tom',
    age: 27,
}

// user1.work.title 접근?
let jobtitle;
if(user1.work) {
    jobtitle = user1.work.title;
}
// or 
jobtitle = user1.work ? user1.work.title : '';

// 접근하려는 속성이 깊게 중첩되어 있는 객체의 경우 코드가 복잡해짐.
// optional chaining 연산자인 ?.을 사용하면 간결하게 코드 작성이 가능하다.
const user1jobtitle = user1.work?.title; // work의 속성 여부를 묻는 것처럼 읽히고 존재한다면 title 속성에 자연스럽게 접근 가능
const user2jobtitle = user2.work?.title;
log("user1", user1jobtitle);
log("user2", user2jobtitle); // 속성이 없다면 undefined

const elon = {
    name : 'Elon Musk',
    education : {
        primary_school : {/* 초등학교 관련 데이터 */},
        middle_school : {/* 중학교 관련 데이터 */},
        high_school : {/* 고등학교 관련 데이터 */},
        university: {
            name : 'University of Pennsylvania',
            graduation: {
                year: 1995,
            },
        },
    },
};

const mark = {
    name: 'Mark Zuckerberg',
    education : {
        primary_school : {/* 초등학교 관련 데이터 */},
        middle_school : {/* 중학교 관련 데이터 */},
        high_school : {/* 고등학교 관련 데이터 */},
        university: {
            name : 'Harvard University',
        },
    },
};

// without optional chaining
let graduationYear;
if(elon.education.university && elon.education.university.graduation && elon.education.university.graduation.year) {
    graduationYear = elon.education.university.graduation.year;
}

// with optional chaining
const elonGraduationYear = elon.education.university?.graduation?.year;
log(elonGraduationYear); // 1995
const markGraduationYear = mark.education.university?.graduation?.year;
log(markGraduationYear); // undefined


// 4. Promise.allSettled()
// 성공 실패와 무관하게 모든 프로미스들이 완료될 때까지 기다렸다가 각각의 결과를 설명하는 객체 배열을 반환
const arrayOfPromises = [
    new Promise((res, rej) => setTimeout(res, 1000)),
    new Promise((res, rej) => setTimeout(rej, 2000)),
    new Promise((res, rej) => setTimeout(res, 3000)),
];

Promise.allSettled(arrayOfPromises).then(data =>log(data));


// 5. null 계열의 값 병합하기
// 거짓 값과 null 계열의 값(nullish value)(null 또는 undefined)은 때때로 비슷할 수 있지만 서로 다른 값임
// 새로 도입된 연산자를 사용하면 null 계열의 값과 거짓값을 서로 구분 가능함.

// !!연산자를 사용해 다양한 자료형의 값을 Boolean으로 변환
const str = "";
log(!!str); // false
const number = 0;
log(!!number); // false
const n = null;
log(!!n); // false
const u = undefined;
log(!!u); // false

// 빈 문자열과 undefined를 구별? -> null coalescing operator(??)(null 병합 연산자)가 유용함.
// null 병합 연산자는 왼쪽 피연산자가 null 계열의 값인 경우 오른쪽 피연산자를 반환한다.

const x = '' ?? 'empty string';
log(x); // ''
const number2 = 0 ?? 'zero';
log(number2); // 0
const n2 = null ?? "it's null";
log(n2); // it's null
const u2 = undefined ?? "it's undefined";
log(u2); // it's undefined

// null 또는 undefined일 가능성이 있는 값에 접근할 때 null 병합 연산자를 사용하여 기본값을 지정해주면 
// 해당 값이 항상 존재한다고 가정할 수 있기 때문에 간결한 코드를 작성하는 데 도움이 된다.


// 6. String.prototype.matchAll()
// matchAll() 메서드는 지정된 정규식에 대해 문자열과 일치하는 모든 결과의 반복자를 반환하는 새로운 메서드.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions (flag)

// 'a'에서 'd' 사이에 있는 문자를 매칭하기 위한 정규식
const regEx = /[a-d]/g;
const str_reg = "Lorem ipsum dolor sit amet";
const regExIterator = str_reg.matchAll(regEx);

log(Array.from(regExIterator));


// 7. module namespace export 문법 -> import, export를 대칭적으로 사용할 수 있게 되었음.
// ES2020 이전에도 다음과 같이 import 가능
// import * as stuff from './test.mjs';
// ES2020부터는 export 시에도 동일하게 가능
// export * as stuff from './test.mjs'; 
// 는 아래 코드와 동일한 역할 수행
// export {stuff};


// 8. import.meta
// import.meta 객체는 URL 등 모듈에 대한 정보를 노출함.
// <script type = "module" src = "test.js"></script>
// log(import.meta); // {url: "file:///home/user/test.js"}
// 객체에 포함된 url은 inline 스크립트의 문서 주소일 수도 있고 외부 스크립트를 가져온 url일 수도 있다.


// 9. globalThis
// ES2020 이전에는 전역 객체(this)에 접근하는 표준화된 방식이 없었음.
// 브라우저에서는 window, Node 환경에서는 global, 웹 워커의 경우 self를 사용해서 전역 객체를 참조했다.
// 런타임에서 현재 환경을 수동으로 감지하여 전역 객체에 접근하는 적절한 방법을 사용해야 했음.
// ES2020부터는 어떤 환경에서든 항상 전역 객체를 참조하는 globalThis를 사용가능함.
// 브라우저에서는 전역 객체에 직접 접근할 수 없기 때문에 globalThis가 전역 객체의 프록시를 참조하게 된다.
// 새로운 globalThis를 사용하면 애플리케이션이 실행되는 환경에 따라 전역 객체에 접근하는 방식이 다른 것에 대해 더 이상 걱정할 필요가 없음.
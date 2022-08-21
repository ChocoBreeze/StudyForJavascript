// 1. 객체에 rest, spread 연산자 사용하기
// 2. 비동기 반복 (asynchronous iterator)
// 3. Promise.prototype.finally()
// 4. 정규식 기능 추가
// 5. 템플릿 리터럴 제한 해제
const log = console.log;

// 9.js
const veggie = ["tomato", "cucumber", "beans"]
const meat = ["pork", "beef", "chicken"]

const menu = [...veggie, "pasta", ...meat]
log(menu);

// 1.
// 배열에사용하던 rest, spread 연산자를 객체에도 사용 가능함.
let myObj = {
    a:1,
    b:3,
    c:5,
    d:8,
};

// 레스트 연산자를 사용하여 a, b를 제외한 나머지 속성을 변수 z에 할당
let {a,b, ...z} = myObj;
log(a); // 1
log(b); // 3
log(z); // { c: 5, d: 8 }

// 스프레드 연산자를 사용해 myObj의 복사본 생성
// 객체의 복사본을 쉽게 만들 수 있고, 원래 객체를 수정해도 당연히 복사본에는 영향이 없다.
let clone = {...myObj};
log(clone); // { a: 1, b: 3, c: 5, d: 8 }
myObj.e = 15;
// log("clone : " + JSON.stringify(clone)); // clone : {"a":1,"b":3,"c":5,"d":8}
log("clone :", clone); // clone : { a: 1, b: 3, c: 5, d: 8 }
log("myObj :", myObj); // myObj : { a: 1, b: 3, c: 5, d: 8, e: 15 }


// 2.
// 데이터를 비동기적으로 반복 가능.
// 자바스크립트 명세서 : https://tc39.es/proposal-async-iteration/
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for-await...of

// 비동기 반복자는 next() 메서드가 {value, done} 쌍에 대한 프로미스를 반환한다는 점을 제외하면 동기 반복자와 매우 유사하다.
// 비동기 반복을 위해, 각각의 이터러블을 프로미스로 변환해서 작동하는 for-await-of 루프를 사용할 수 있다.
// 실행 중에 이터러블이 가진 [Symbol.asyncIterator]() 메서드를 통해 비동기 반복자가 생성된다.
// 루프 속에서 이터러블의 다음 값에 접근할 때마다 반복자 메서드에서 반환된 프로미스를 await한다.

const iterables = [1,2,3];
async function test() {
    for await (const value of iterables) {
        log(value);
    }
}

// test(); // 1 2 3

// 다른 예시(책 x)
async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        yield i++; // generator 버전의 return 키워드
    }
}
// yield
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield

// (async function() {
//     for await (let num of asyncGenerator()) {
//         console.log(num);
//     }
// })();
// 0
// 1
// 2


// 3.
// .finally()로 프로미스가 완료될 때 호출할 콜백을 등록할 수 있음.
// .finally()또한 프로미스를 반환하므로 .then()과 .catch()를 계속 연결할 수 있지만,
// 연결된 promise는 .finally()가 반환한 값이 아니라 그 전의 프로미스가 반환한 값을 전달받게 된다.
const myPromise = new Promise((resolve, reject) => {
    resolve();
});

myPromise
    .then(() => {
        log('1 - still working');
    })
    .catch(() => {
        log('1 - there was an error');
    })
    .finally(() => {
        log('1 - Done!');
    })

myPromise
    .then(() => {
        log('2 - still working');
        return '2 - still working';
    })
    .finally(() => {
        log('2 - Done!');
        return '2 - Done!';
    })
    .then(res => {
        log(res); // finally에서 반환한 값이 아닌 then에서 반환한 값을 출력
    })


// 4.
// ECMAScript의 새 버전에는 4가지 새로운 정규식(RegExp) 관련 기능이 추가되었음.
// (1) s(dotAll) flag
// . 표현식이 개행 문자를 포함한 모든 문자를 포함하도록 함.(정규 표현식에서 . 표현식은 개행 문자를 제외한 모든 문자를 의미함.)
log(/foo.bar/s.test('foo\nbar')); // true

// (2) named capture group
// 자바스크립트 명세서 : https://tc39.es/proposal-regexp-named-groups/
/*
번호가 매겨진 캡처 그룹으로 정규식이 일치하는 문자열의 특정 부분을 참조할 수 있다.
각 캡처 그룹에는 순서대로 고유 번호가 할당되고 해당 번호를 사용하여 참조할 수 있다.
하지만 자동으로 할당되는 번호만으로는 정규식을 파악하고 리팩터링하기가 어렵다.
예를 들어 정규식 /(\d{4})-(\d{2})-(\d{2})/를 날짜와 매칭 
-> 어떤 그룹이 월, 일인지 알기 어려움 또한 월과 일의 순서를 바꾸고 싶다면 그룹 참조 번호도 그 순서에 맞춰 변경해야 함.
(?<name>...) 구문을 통해 캡처 그룹에 원하는 이름을 지정 가능함.
날짜에 대한 정규식을 /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/ 형태로 작성 가능하다.
각 이름은 고유해야 하며 ECMAScript IdentifierName의 문법을 따라야 함.
명명된 그룹은 매칭 결과를 담은 객체의 groups 속성을 통해 접근 가능함.
기존의 명명되지 않은 그룹과 마찬가지로, 그룹에 대한 번호 참조도 함께 생성된다.
*/
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let result = re.exec('2015-01-02');
// result.groups.year === '2015';
// result.groups.month === '01';
// result.groups.day === '02';

// result[0] === '2015-01-02';
// result[1] === '2015;
// result[2] === '01';
// result[3] === '02';
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
log(`one : ${one}, two : ${two}`); // one : foo, two : bar

// (3) lookbehind assertion
// 자바스크립트 명세서 : https://tc39.es/proposal-regexp-lookbehind/
/*
lookbehind assertion을 사용하면 패턴 앞에 다른 패턴이 있는지 여부를 확인할 수 있다.
예를 들어 달러를 포함한 문자열에서 달러 기호를 캡처하지 않고 달러 금액 부분만 매칭할 수 있다.

positive lookbehind assertion은 (?<=...)으로 표시하며 그 안에 포함된 패턴이 assertion 다음에 오는 패턴보다 먼저 나오는지를 확인한다.
예를 들어 달러 기호를 캡처하지 않고 달러 금액을 매칭하려면 /(?<=\$)\d+(\.\d*)?/를 사용해서 '$10.53'과 매칭하고 '10.53'만 매칭 결과로 얻을 수 있다.
그러나 이 정규식은 '€10.53' 같은 값과는 매칭되지 않는다. € : 유로

negative lookbehind assertion은 (?<!...)으로 표시하며, 그 안에 포함된 패턴이 assertion 다음의 패턴보다 앞에 있지 않은지를 검사한다.
예를 들어 /(?<!\$)\d+(?:\.\d*)/는 '$10.53'에 매칭되지는 않지만 '€10.53'과는 매칭된다.
*/

// (4) Unicode property escapes
// 자바스크립트 명세서 : https://tc39.es/proposal-regexp-unicode-property-escapes/
/*
\p{...} 및 \P{...} 형식으로 Unicode property escape를 사용할 수 있다.
유니코드 속성 이스케이프는 u 플래그가 설정된 정규식에서 사용할 수 있는 새로운 유형의 이스케이프 시퀀스이다.
*/
const regexGreekSymbol = /\p{Script=Greek}/u;
log("pi? : ",regexGreekSymbol.test('π')); // true



// 5.
// 자바스크립트 명세서를 참고하자.
// https://tc39.es/proposal-template-literal-revision/#sec-template-literals

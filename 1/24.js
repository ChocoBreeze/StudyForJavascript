// ES2021
// 1. String.prototype.replaceAll()
// 2. Promise.any()
// 3. 논리 연산자(&&, ||, ??)와 할당 표현식(=)
// 4. 숫자 구분 기호
// 5. weak reference(약한 참조)
// 6. Intl.ListFormat
// 7. Intl.DateTimeFormat의 dateStyle 및 timeStyle 옵션

const log = console.log;

// 1. String.prototype.replaceAll()
// 일치하는 모든 패턴을 찾아내서 교체(RegEx 없이 가능)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
// https://tc39.es/proposal-string-replaceall/
const str = 'I like my dog, my dog loves me';
const newStr = str.replace('dog', 'cat'); // RegEx가 아니라면 일치하는 첫 패턴만 교체 가능
log(newStr);

const newStr2 = str.replaceAll('dog', 'cat');
log(newStr2);


// 2. Promise.any()
// 주어진 프로미스 중 하나라도 성공하면 실행이 완료되지만 그렇지 않다면 모든 프로미스가 실패할 때까지 계속된다.
// 내부의 모든 프로미스가 실패하면, 모든 프로미스의 실패 이유가 포함된 AggregateError(Error의 하위 클래스)가 발생.
// https://github.com/tc39/proposal-promise-any
// Promise.race()와 혼동하면 안 된다.(하나라도 성공하거나 실패하면 전체 프로미스 실행 끝)
// 프로미스가 실패했을 때의 동작은 유사하지만, 실패했을 때의 동작은 매우 다르다.

// 3. 논리 연산자(&&, ||, ??)와 할당 표현식(=)
// 루비 언어처럼 논리 연산자와 할당 표현식을 결합할 수 있음.
// https://github.com/tc39/proposal-logical-assignment
// ?? : null 병합 연산자 (왼쪽이 null이거나 undefined인 경우 오른쪽 항목을 반환, 아닌 경우 왼쪽 반환)
let a = null ?? 'test';
log(a); // "test"
let b = 0 ?? 'test';
log(b); // 0

a||=b; // a = a || b; - a가 참이면 a 반환, a가 거짓이면 b 반환
a&&=b; // a = a && b; - a, b가 모두 참이면 b를 반환 그렇지 않으면 a를 반환
a??=b; // a = a ?? b; - a가 null이거나 undefined인 경우 b를 반환, 그렇지 않으면 a를 반환


// 4. 숫자 구분 기호
// 큰 숫자의 경우 '_'를 통해 숫자 가독성 향상
// https://github.com/tc39/proposal-numeric-separator
let x = 100_000_000;
log(x);


// 5. weak reference(약한 참조)
// 가비지 컬렉터에서 객체를 회수하는 것을 방지하지 않는 참조
// WeakRef 클래스를 사용해서 객체에 대한 약한 참조를 만들 수 있게 됨.
// https://github.com/tc39/proposal-weakrefs


// 6. Intl.ListFormat
// 각종 언어별로 목록 서식을 활성화하는 객체의 생성자.
// https://github.com/tc39/proposal-intl-list-format
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
const list = ['Apple', 'Orange', 'Banana'];

// 이탈리아어
log(new Intl.ListFormat('it', {style: 'long', type: 'conjunction'}).format(list));
// 스페인어
log(new Intl.ListFormat('es', {style: 'long', type: 'conjunction'}).format(list));
// 독일어
log(new Intl.ListFormat('de', {style: 'long', type: 'conjunction'}).format(list));
// 한글(conjunction - AND)
log(new Intl.ListFormat('ko', {style: 'long', type: 'conjunction'}).format(list));
// 한글(disjunction - OR)
log(new Intl.ListFormat('ko', {style: 'long', type: 'disjunction'}).format(list));
// 한글(unit - 개별)
log(new Intl.ListFormat('ko', {style: 'long', type: 'unit'}).format(list));


// 7. Intl.DateTimeFormat의 dateStyle 및 timeStyle 옵션
// dateStyle과 timeStyle 옵션 -> 시간대에 따른 날짜 및 시간 서식을 지정할 수 있음
// https://github.com/tc39/proposal-intl-datetime-style
// 원하는 시간대의 지역을 전달할 때에 short, medium, long 3가지 옵션 중 선택 가능.
// dateStyle과 timeStyle 옵션을 동시에 전달하는 것도 가능하다.
// dateStyle
log(new Intl.DateTimeFormat("en", {dateStyle: "short"}).format(Date.now())); // 8/24/22
log(new Intl.DateTimeFormat("en", {dateStyle: "medium"}).format(Date.now())); // Aug 24, 2022
log(new Intl.DateTimeFormat("en", {dateStyle: "long"}).format(Date.now())); // August 24, 2022
// 한글
log(new Intl.DateTimeFormat("ko", {dateStyle: "short"}).format(Date.now())); // 22. 8. 24.
log(new Intl.DateTimeFormat("ko", {dateStyle: "medium"}).format(Date.now())); // 2022. 8. 24.
log(new Intl.DateTimeFormat("ko", {dateStyle: "long"}).format(Date.now())); // 2022년 8월 24일

// timeStyle
log(new Intl.DateTimeFormat("en", {timeStyle: "short"}).format(Date.now())); // 12:01 AM
log(new Intl.DateTimeFormat("en", {timeStyle: "medium"}).format(Date.now())); // 12:01:23 AM
log(new Intl.DateTimeFormat("en", {timeStyle: "long"}).format(Date.now())); // 12:01:23 AM GMT+9
// 한글
log(new Intl.DateTimeFormat("ko", {timeStyle: "short"}).format(Date.now())); // 오전 12:06
log(new Intl.DateTimeFormat("ko", {timeStyle: "medium"}).format(Date.now())); // 오전 12:06:03
log(new Intl.DateTimeFormat("ko", {timeStyle: "long"}).format(Date.now())); // 오전 12시 6분 3초 GMT+9

// 같이 전달
log(new Intl.DateTimeFormat("ko", {dateStyle: "long", timeStyle : "long"}).format(Date.now())); // 2022년 8월 24일 오전 12시 7분 52초 GMT+9
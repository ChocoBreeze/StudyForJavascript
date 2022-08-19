// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator
// 1.
// generator 함수 : 원하는 만큼 코드 실행을 시작하거나 중지할 수 있는 함수.
// 중지된 제네레이터 함수를 다시 시작할 때 데이터를 추가로 전달하면서 재시작 가능함.
const log = console.log;

// 제너레이터 함수 생성
function* fruitList() { // 함수 선언
    yield 'Banana'; // 반환할 컨텐츠 앞에 yield 키워드 사용
    yield 'Apple';
    yield 'Orange';
}
const fruits = fruitList();

// 제너레이터
// .next() : 함수의 실행을 시작
// .next() 호출 사이에서 일시 중지된 상태에 있음.
log(fruits.next()); // { value: 'Banana', done: false }
log(fruits.next()); // { value: 'Apple', done: false }
log(fruits.next()); // { value: 'Orange', done: false }
log(fruits.next()); // { value: undefined, done: true }

// 2.
// generator를 사용해 배열 반복하기
// for of : 제너레이터에 대해 반복하고 각 루프에서 컨텐츠를 반환(yield)할 수 있음.

const fruitList2 = ['Banana', 'Apple', 'Orange', 'Melon', 'Cherry', 'Mango']; // 과일 배열

// 제너레이터 생성
function* loop(arr) {
    for(const item of arr) {
        yield `I like to eat ${item}s`;
    }
}
// 배열을 반복하고 .next()를 호출할 때마다 한 번에 하나의 값을 출력함
// 값을 가져오는 것에 대해서만 관심이 있다면 .next().value를 사용하면 됨.(제너레이터 상태는 출력하지 않음)

const fruitGenerator = loop(fruitList2);
log(fruitGenerator.next()); // { value: 'I like to eat Bananas', done: false }
log(fruitGenerator.next()); // { value: 'I like to eat Apples', done: false }
log(fruitGenerator.next().value); // I like to eat Oranges

// 3.
// .return()을 사용하여 제너레이터 종료하기(+주어진 값 반환)
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator/return
// 제너레이터의 return() 메서드는 현재 중단된 위치에서 제너레이터 본체에 리턴 문이 삽입 된 것처럼 작동합니다.
// return() 메서드는 현재 중단된 위치의 제너레이터 본체에 삽입된 return value;처럼 보일 수 있습니다. 
// 여기서 value는 return() 메서드에 전달된 값입니다. 
// 따라서 일반적인 흐름에서 return(value)를 호출하면 { done: true, value: value }가 반환됩니다. 
// 그러나 yield 식이 try...finally 블록으로 감싸진 경우, 제어 흐름은 함수를 종료 하지 않고 finally 블록이 실행되도록 합니다. 
// 이 경우 반환되는 값은 다를 수 있으며 finally 블록 내에 더 많은 yield식이 있다면 done도 false일 수 있습니다.
const fruits2 = fruitList();
log(fruits2.return()); // 이 경우 .return()에 아무것도 전달하지 않았음. -> { value: undefined, done: true }
log(fruits2.return(1)); // 이 경우 .return()에 아무것도 전달하지 않았음. -> { value: 1, done: true }
// 내가 주는 값으로 리턴되는 건데 왜 쓰는거지?

// 4.
// .throw()로 오류 잡기
function* gen() {
    try {
        yield "Trying...";
        yield "Trying harder...";
        yield "Trying even harder...";
    }
    catch(err) {
        log("Error: "+ err);
    }
}

const myGenerator = gen();
log(myGenerator.next()); // { value: 'Trying...', done: false }
log(myGenerator.next()); // { value: 'Trying harder...', done: false }
log(myGenerator.throw("ooops")); // Error: ooops { value: undefined, done: true }
// .throw()를 호출했을 때 제너레이터는 오류를 반환했고, 실행할 수 있는 yield가 하나 더 남아 있는데도 종료됨.

// 5.
// 제너레이터와 프로미스를 같이 사용하기 -> 마치 동기 코드처럼 느껴지게 비동기 코드를 작성가능하다.
// 프로미스는 비동기 프로그래밍에 매우 유용함.
// 제너레이터와 함께 사용하면 콜백 지옥 같은 문제를 방지할 수 있는 매우 강력한 도구임.

// 프로미스가 완료될 때까지 기다렸다가 완료될 때 반환된 값을 .next() 호출 시점에 제너레이터로 다시 전달하는 코드
const myPromise = () => new Promise((resolve) => {
    resolve("our value is...");
});

function* gen2() {
    let result = "";
    yield myPromise().then(data => {result = data}); // 프로미스를 반환
    yield result + '2'; // 프로미스의 결과를 기다린 후 이 값을 사용
};

const asyncFunc = gen2(); // 비동기 함수 호출
const val1 = asyncFunc.next(); // next 첫 호출 시 promise 반환
log(val1); // { value: Promise { <pending> }, done: false }

val1.value.then(() => { // 프로미스가 완료되기를 기다린 후 .next()를 호출
    log(asyncFunc.next()); // next를 다시 호출하면 제너레이터 내부에서는 프로미스에서 반환된 값을 사용하여 작업을 수행 { value: 'our value is...2', done: false }
});

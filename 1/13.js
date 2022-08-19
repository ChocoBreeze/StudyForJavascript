// https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing
// 자바스크립트는 동기적(synchronous)으로 동작함.
// 각 코드 블록이 이전 블록 이후에 실행된다.
const log = console.log;

const data = 0;
// const data = fetch('your-api-url-goes-here') // fetch is not defined
log('Finished')
log(data);

// 위의 코드는 fetch 작업이 완료되는 것을 기다리지 않고
// data를 출력한다. -> fetch가 asynchronous으로 수행되기 때문이다.

// 비동기 코드를 동기식으로 작동하는 것처럼 하기 위해 callback으로 여러 코드 블록을 차례로 연결해 작성
// 비동기 코드가 많아지는 경우 callback hell이라고 부르는 상황이 만들어 진다.

// Promise
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
// 프로미스는 비동기 작업의 최종 성공 또는 실패를 나타내는 객체.
const myPromise = new Promise((resolve, reject) => {
    // 성공 시 resolve -> .then()
    // 실패 시 reject -> .catch()
    setTimeout(() => {
        reject((new Error("this is our error"))); 
        // reject("this is our error")가 아닌 new Error -> 발생 위치 알 수 있다
    }, 3000);
    setTimeout(() => {
        resolve("The value we get from the promise")
    }, 2000);
});

myPromise
    .then(data => {
        log(data);
    })
    .catch(err => {
        log(err);
    })

// promise chaining : 프로미스의 성공, 실패 여부와 무관하게 이전 프로미스에서 반환된 것을
// 후속 프로미스의 기반으로 사용하여 프로미스를 계속 chaining할 수 있음.
const myPromise_chain = new Promise((resolve, reject) => {
    resolve();
});

myPromise_chain.then(data => {
    return 'working...';
})
.then(data => {
    // 이전 프로미스에서 받은 값 출력
    log(data);
    throw 'failed!';
})
.catch(err => {
    // 프로미스 수행 중 발생한 오류를 받아서 출력
    log(err); // console.error(err);(원래 코드)
})

// Promise.resolve()와 Promise.reject()
// 자동으로(즉시) 성공하거나 실패하는 프로미스를 생성
// .then의 첫 함수는 성공 시 호출, 두번째 함수는 실패 시 호출
Promise.resolve('Success').then(function(value) {
    log('Success');
}, function(value) {
    log('fail')
});
Promise.reject(new Error('fail')).then(function() {
    // not called
}, function(error) {
    log(error);
})

// Promise.all()과 Promise.race()
// Promise.all()은 모든 프로미스가 성공할 경우에만 성공하는 하나의 프로미스를 반환함.
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'first value');
});
const promise2 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 1000, 'second value');
    reject(Error("oooops error"))
});

Promise.all([promise1, promise2]).then(data => {
    const [promise1data, promise2data] = data;
    log(promise1data, promise2data);
})
.catch(err => { // 하나라도 실패 시
    log(err);
})

// Promise.race()는 이터러블에 포함된 프로미스들 중 가장 먼저 성공 또는 실패한 결과를 반환함
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'first value');
});
const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'second value');
});
Promise.race([promise3, promise4])
.then(function(value) {
    log(value); // first value
})

// async, await
const log = console.log;

// 기존 프로미스
// 특정 깃허브 사용자에 대한 정보를 가져와서 콘솔에 출력.
/*
fetch('https://api.github.com/users/AlbertoMontalesi').then(res => {
    // 응답을 json 형식으로 반환
    return res.json();
}).then(res => {
    log(res); // 성공 시 데이터 출력
}).catch(err => {
    log(err); // 실패 시 오류 출력
});
*/

// 다른 예시
function walk(amount) {
    return new Promise((resolve, reject) => {
        if(amount < 500) {
            reject ("the value is too small");
        }
        setTimeout( () => resolve(`you walked for ${amount}ms`), amount);
    });
}
/*
// async, await 출력을 위해 주석 처리
walk(1000).then(res => {
    log(res);
    return walk(500);
}).then(res=> {
    log(res);
    return walk(700);
}).then(res=> {
    log(res);
    return walk(800);
}).then(res=> {
    log(res);
    return walk(100); // 여기서 reject
}).then(res=> {
    log(res);
    return walk(400);
}).catch(err => { // .catch 추가(없으면 에러)
    log(err);
    return walk(400);
}).then(res=> {
    log(res);
    return walk(600);
}).catch(err => { // .catch 추가(없으면 에러)
    log(err);
    return walk(600);
}).then(res => {
    log(res);
})*/

log("")
log("async, await")
// async, await
async function go() {
    const res = await walk(500); // 프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    log(res);
    const res2 = await walk(900); // 프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    log(res2);
    const res3 = await walk(600); // 프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    log(res3);
    const res4 = await walk(700); // 프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    log(res4);
    const res5 = await walk(400); // 프로미스가 완료될 때까지 기다리기 위해 await 키워드 사용
    log(res5);
    log("finished");
}

go();

/*
비동기 함수를 만들려면 함수 앞에 async 키워드를 붙여야 함.
해당 키워드는 자바스크립트에게 항상 프로미스를 반환하도록 지시함.
비동기 함수 내에서 promise가 아닌 값을 반환하게 작성하면 자바스크립트가 해당 값을 자동으로 promise로 감싼 후에 반환한다.
await 키워드는 비동기 함수 내에서만 작동한다.
await 키워드는 프로미스가 결과를 반환할 때까지 기다리도록 자바스크립트에 지시한다.
*/

// await는 비동기 함수 내에서만 사용할 수 있다.
// 일반 함수에서 await 사용 -> SyntaxError
// 코드의 최상위 레벨에서 await 사용 -> SyntaxError
// .mjs 모듈로 바꾸면 최상위 레벨에서 await 사용 가능하긴 함.
// https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/ -> .mjs로 바꾸기

// 오류 처리
// 일반적인 promise에서 .catch()를 사용하여 프로미스가 반환하는 오류들을 처리가능함.
// 1. catch(try catch 없이)
async function asyncFunc_catch() {
    let response = await walk(400);
}

// 간단한 출력 
asyncFunc_catch().catch(log);
asyncFunc_catch().catch(err => log(err));

// 2. try-catch
async function asyncFunc() {
    try {
        let response = await walk(400);
        log(response);
    } catch(err) {
        log(err);
    }
}

asyncFunc();
// https://joshua1988.github.io/web-development/javascript/js-async-await/
//https://learnjs.vlpt.us/async/02-async-await.html
const log = console.log;


// anonymous function(익명 함수)
const 함수1 = function () {    
    log('... 1')
    log('... 2')
    log('... 3')
}

함수1() // 선언보다 먼저 호출 시 에러

log(typeof 함수1)
log(함수1) // 출력 시 별 다른 이름이 붙지 않음


함수2() // 선언보다 먼저 호출해도 문제 없음
// 선언적 함수
function 함수2 () {
    log('함수 내부의 코드입니다 ... 1')
    log('함수 내부의 코드입니다 ... 2')
    log('함수 내부의 코드입니다 ... 3')
    log('')
}

함수2()
log(typeof 함수2)
log(함수2) // 함수에 이름이 붙어 있음.

//출력 결과는 별 차이 없는데..?
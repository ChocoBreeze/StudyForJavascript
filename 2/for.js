const log = console.log;

const todos = ['우유 구매', '업무 메일 확인하기', '필라테스 수업']

// for in
// 배열 요소를 하나하나 꺼내서 특정 문장을 실행할 때 사용 - 인덱스 존재
log("for in")
for(const i in todos) {
    log(`${i}번째 할 일 : ${todos[i]}`)
}

// for of
// 인덱스는 없고 바로 요소 사용
log("for of")
for (const todo of todos) {
    log(`오늘의 할 일: ${todo}`)
}

// 기본 for
log("for")
for(let i=0;i<todos.length;++i) {
    log(`${i}번째 할 일 : ${todos[i]}`)
} 
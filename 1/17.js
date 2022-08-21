// 1.Array.prototype.includes()
// 2.지수 연산자(**)
const log = console.log;


// 1.
let array = [1,2,4,5];
// 기본적인 원소 유무 
log(array.includes(2)); // true
log(array.includes(3)); // false

// 원소 유무 + 시작 index
log(array.includes(3,1)); // 1번 인덱스부터 시작해서 3 찾기 - false
log(array.includes(1,-1)); // 배열 끝에서부터 시작해서 1 찾기 - false
log(array.includes(2,-3)); // 배열 끝에서 세 번째 인덱스부터 시작해서 2 찾기 - true

// 2. 
// Before ES2016
log(Math.pow(2,2)); // 4
log(2 ** 2); // 4

log(Math.pow(Math.pow(2,2),2)); // 함수를 계속 이어서 써야 함 -> 가독성 저하
log(2 ** 2 ** 2); // 16 -> 동일한 작업을 더 간결하게 표현 가능


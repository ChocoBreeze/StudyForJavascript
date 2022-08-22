const log = console.log;

// 객체와 배열 고급
const obj = {
    name : '혼자 공부하는 파이썬',
    price : 18000,
    publisher : '한빛미디어',
}

obj.name || log('name 속성이 없습니다.');
obj.nickname || log('nickname 속성이 없습니다.'); // 이거만 출력

// 배열 기반의 다중 할당
let [a,b] = [1, 2];
log(a,b); // 1, 2

[a,b] = [b,a]; // swap
log(a,b); // 2, 1

// 객체 기반의 다중 할당
const {name, price } = obj; // 기존 속성 유지
log(name, price);

const {i = name, j= price} = obj; // 속성 이름 변경
log(i,j);

// 배열 전개 : ... 이용 -> 깊은 복사
// 객체 전개 : ... 이용

// 얕은 복사 : 복사하는 행위가 단순하게 다른 이름을 붙이는 형태로 동작하는 복사를 의미함.
// 깊은 복사 : 복사 후 두 객체를 완전하게 독립적으로 사용할 수 있는 복사를 의미함. -> ... 연산자를 통해 가능.

// 디스트럭처링 할당 문법은 배열의 값 또는 객체의 속성을 풀어서 별개의
// 변수로 쓸 수 있게 해주는 자바스크립트 표현식

const log = console.log;

const person = {
    first: "Alberto",
    last: "Montalesi",
    links: {
        social: {
            facebook: "https://www.facebook.com/alberto.montalesi",
        },
        website: "https://albertomontalesi.github.io/",
    },
};

const {first, last} = person;
log(first, last);

// const {facebook} = person.links.social;
// log(facebook) // https://www.facebook.com/alberto.montalesi

// 변수 이름 변경도 가능 + 기본값 전달도 가능
const {facebook:fb = "https://www.facebook.com"} = person.links.social;
// person.links.social.facebook 프로퍼티를 찾아 fb라는 변수로 명명
log(fb);
// log(facebook); // 오류(변수명이 facebook이 아님.)

// 배열은 [] 사용
const person1 = ["Alberto", "Montalesi", 25]
const [name, surname, age] = person1;
log(name, surname, age)
// const [name, surname] = person // 개수가 적어도 가능

const fruits = ["Apple", "Cherry", "Banana", "Grape", "Lemon"]
const [f1, f2, ...fs] = fruits // ...(rest 연산자)를 통해 나머지 값 전체를 획득 가능
log(fs);

// 변수 swap
let a=6;
let b=3;
log("before", a,b);
[a,b] = [b,a]
log("after", a,b);
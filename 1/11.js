// symbol : 항상 unique하며 객체 속성의 식별자로 사용 가능함.
// ES6에서 추가된 원시 자료형
const log = console.log;

const me = Symbol("Alberto")
log(me); // Symbol(Alberto)
const clone = Symbol("Alberto")

// 심볼은 항상 고유하다
log(me == clone); // false
log(me === clone); // false

const office = {
    [Symbol("Tom")]: "CEO",
    [Symbol("Mark")]: "CTO",
    [Symbol("Mark")]: "CIO",
};
// symbol은 열거 가능하지 않기 때문에 반복하려고 하면 undefined를 얻게 된다.
for (person in office) { 
    log(check)
    log(person); // undefined
}

// 객체 속성의 배열을 얻기 위해서는 Object.getOwnPropertySymbols()를 사용함
const symbols = Object.getOwnPropertySymbols(office);
log("symbols", symbols) // symbols [ Symbol(Tom), Symbol(Mark), Symbol(Mark) ]
// 배열 얻은 후 속성 접근 : map이용
const value = symbols.map(symbol => office[symbol]);
log(value); // [ 'CEO', 'CTO', 'CIO' ]
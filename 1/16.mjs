import util from 'util';
const log = console.log;
const inspect = util.inspect;
// 1.
// set : 어떠한 자료형의 값이든 각 원소를 고유하게 저장하는 객체

log("1. Set")
const family_set = new Set(); // set 생성

family_set.add("Dad");
log(family_set); // Set(1) { 'Dad' }

family_set.add("Mon");
log(family_set); // Set(2) { 'Dad', 'Mon' }

family_set.add("Son");
log(family_set); // Set(3) { 'Dad', 'Mon', 'Son' }

family_set.add("Dad"); // 중복 - 추가되지 않음
log(family_set); // Set(3) { 'Dad', 'Mon', 'Son' }

log(family_set.size); // 3
log(family_set.keys()); // [Set Iterator] { 'Dad', 'Mon', 'Son' }
log(family_set.entries()); // [Set Entries] { [ 'Dad', 'Dad' ], [ 'Mon', 'Mon' ], [ 'Son', 'Son' ] }
log(family_set.values()); // [Set Iterator] { 'Dad', 'Mon', 'Son' }
family_set.delete("Dad");
log(family_set); // Set(2) { 'Mon', 'Son' }
family_set.clear();
log(family_set); // Set(0) {}


family_set.add("Dad");
family_set.add("Mom");
family_set.add("Son");
// set에 대한 loop
// 1. .next()
const iterator = family_set.values();
log(iterator.next()); // { value: 'Dad', done: false }
log(iterator.next()); // { value: 'Mom', done: false }
log(iterator.next()); // { value: 'Son', done: false }
log(iterator.next()); // { value: undefined, done: true }

// 2. for of
for(const person of family_set) { // 그냥 넣은 순서대로 나오는듯
    log(person);
}

// 배열에서 중복 제거하기
const myArray = ["dad", "mom", "son", "dad", "mom", "daughter"];
const tmp_set = new Set(myArray);
log("tmp_set", tmp_set); // tmp_set Set(4) { 'dad', 'mom', 'son', 'daughter' }

const uniqueArray = Array.from(tmp_set); // Set을 Array로 변환
log("uniqueArray", uniqueArray); // uniqueArray [ 'dad', 'mom', 'son', 'daughter' ]

// 한 줄로
const uniqueArray_one_line = Array.from(new Set(myArray));
log("uniqueArray_one_line", uniqueArray_one_line); // uniqueArray_one_line [ 'dad', 'mom', 'son', 'daughter' ]

// 2.
// weakSet : Set와 유사하지만 객체만 포함 가능함. (객체 참조를 약하게 보유한다는 의미가 들어 있음)
log("2. WeakSet")
let dad = {name : "Daddy", age: 50};
let mom = {name: "Mommy", age: 45};
const family_set_weak = new WeakSet([dad,mom]);
// Console log WeakSet and WeakMap always empty
// https://stackoverflow.com/questions/62502224/es6-console-log-on-weakset-gives-item-unknown
// https://github.com/nodejs/node/issues/19001
// const {inspect} = require('util'); mjs모듈로 바꾸면서 맨 윗줄
log(inspect(family_set_weak, { showHidden: true }));
// weakSet은 iterable이 아니기 때문에 for of 루프를 사용하려고 하면 작동하지 않음.
// weakSet이 포함하는 객체가 garbage collector에 의해 삭제되면 해당 객체는 WeakSet에서도 자동으로 삭제된다.
// garbage collector에 의해 언제든지 원소가 삭제될 수 있기 때문에 의도적으로 원소들에 대해 반복을 할 수 없도록 설계됨.
/*for (const person of family_set_weak) {
    log(person);
}*/

dad = null;
log(inspect(family_set_weak, { showHidden: true }));
// setTimeout(() => log(inspect(family_set_weak, { showHidden: true })), 60000); // 60초 기다리기 
// 코드를 기다리는 것이 아닌 그냥 해당 라인을 60초 뒤에 수행하는 것 뿐임.

// await (ms => {return new Promise(r => setTimeout(r, ms)); })(30000); // 30초 기다리기 - 책에 있는 코드 - await is not defined 에러

function resolveAfterNSeconds(N) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(N);
        }, N * 1000);
    })
}
async function f1(N) {
    let x = await resolveAfterNSeconds(N);
    log(x,"초 후");
    log(inspect(family_set_weak, { showHidden: true }));
}

// 여기면 top level이 아닌가? await is only valid in async functions and the top level bodies of modules -> .js에서는 안 됨
// https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/ -> .mjs로 바꾸기
const tmp = await f1(120); // 60초 기다린 후 log 출력 (의도는 dad가 null이 된 후 삭제된 것을 보여줘야하는데 의도처럼 되지 않음.)

// 3.
// map : Set과 유사하지만 키/값 쌍으로 이루어진다.
log("3. Map")
const family_map = new Map();

family_map.set("Dad", 40);
family_map.set("Mon", 50);
family_map.set("Son", 20);

log(family_map);
log(family_map.size);
// 1. forEach
family_map.forEach((val,key) => log(key, val));
// 2. for of
for(const [key, val] of family_map) {
    log(key, val);
}

// 4.
// Weakmap : 키/값 쌍의 모음이지만 키는 객체여야만 함.
// Weakmap에서도 키(객체)는 weak하게 참조됨.
// 키로 사용된 객체의 참조가 손실되어 가비지 콜렉터에 의해 수집되면 WeakMap에서도 해당 키/값이 자동으로 제거됨.
// 열거가능하지 않기 때문에 원소에 반복 수행하는 것이 불가능함.
let dad_Wm = {name: "daddy"};
let mom_Wm = {name: "mommy"};

const myMap = new Map();
const myWeakMap = new WeakMap();

myMap.set(dad_Wm, "any value");
myWeakMap.set(mom_Wm, "any value");

dad_Wm = null;
mom_Wm = null;
log(myMap); // Map {{...} => "any value"}
log(inspect(myWeakMap, { showHidden: true })); // WeakMap {{...} => "any value"}

// await (ms => {return new Promise(r => setTimeout(r,ms)); })(30000); // 30초 기다리기 - 책에 있는 코드(await 관련해서 에러가 남.)
async function f2(N) {
    let x = await resolveAfterNSeconds(N);
    log(x,"초 후");
    log(inspect(myWeakMap, { showHidden: true }));
}
const tmp2 = f2(60);

log(myMap); // Map {{...} => "any value"}
log(inspect(myWeakMap, { showHidden: true })); // Weakmap {} (의도는 mom_Wm이 null이 된 후 삭제된 것을 보여줘야하는데 의도처럼 되지 않음.)
// weakMap에서는 null로 설정한 객체가 제거되지만, Map에는 남아있음을 확인 가능하다.
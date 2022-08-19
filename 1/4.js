// template string(before ES6) -> template literal
// ES6 backtick
let name = "Alberto";
const greeting = `Hello my name is ${name}`;

console.log(greeting);

const content = `hello,
my name is Alberto
how are you?`;
console.log(content) // 여러 줄도 가능

// 중첩 템플릿
const people = [{
    name : 'Alberto',
    age : 27,
}, {
    name : 'Caroline',
    age : 27,
}, {
    name : 'Josh',
    age: 31,
}]

const markup = `
<ul>
    ${people.map(person => `<li> ${person.name}</li>`)}
</ul>
`;
console.log(markup);

// 삼항 연산자

/*const artist = {
    name: "Bon Jovi",
    age : 56,
};*/

const artist = {
    name: "trent Reznor",
    age : 53,
    song : 'Hurt',
}

// artist 객체에 song 프로퍼티가 있을 때만 문장에 추가하고, 없으면 아무것도 반환하지 않음
const text = `
    <div>
        <p> ${artist.name} is ${artist.age} years old ${artist.song ? `and wrote the song ${artist.song}` : ''}
        </p>
    </div>
`;

console.log(text);

// 필요하다면 템플릿 리터럴 내에 함수 전달도 가능
// ${함수()}

// 태그된 템플릿 리터럴
// 함수를 tag하여 템플릿 리터럴을 실행하면 
// 템플릿 내부에 있는 모든 항목이 태그된 함수의 인수로 제공됨
// 참고 : https://codeburst.io/javascript-es6-tagged-template-literals-a45c26e54761
let person = "Alberto";
let age = 25;

function myTag(strings, personName, personAge) {
    // strings: ["That", " is a ", "!"]
    // 즉, 템플릿 리터럴에 포함된 변수들을 구분자로 삼아 문자열을 나눈 결과
    // 나머지는 personName, personAge에 각각 들어감.
    let str = strings[1]; // " is a "
    let ageStr;

    // personAge > 50 ? ageStr = "grandpa" : ageStr = "youngster"; 
    ageStr = personAge > 50 ? "gradnpa" : "youngster";

    // personName : Alberto
    // str : is a 
    // ageStr : youngster
    return personName + str + ageStr;
}

let sentence = myTag`That ${person} is a ${age}!`;
console.log(sentence); // Alberto is a youngster.
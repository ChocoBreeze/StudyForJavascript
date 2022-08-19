// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// proxy : Proxy 객체는 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용합니다. (사용자 지정 동작을 추가로 정의할 때)
const log = console.log;

// 2. 프록시 생성
// var x = new Proxy(target, handler);
// target : 객체, 함수, 다른 프록시 등 무엇이든 가능
// handler : 작업이 수행될 때 프록시의 동작을 정의하는 객체.

const dog = {breed: "German Shephard", age : 5}; // 원본 객체

// 프록시 객체
const dogProxy = new Proxy(dog, {
    get(target, breed) {
        return target[breed].toUpperCase();
    },
    set(target, breed, value) {
        log("changing breed to...");
        target[breed] = value;
    },
});
log(dogProxy.breed); // GERMAN SHEPHARD
log(dogProxy.breed = "Labrador"); // changing breed to... Labrador
log(dogProxy.breed); // LABRADOR

// 3. 프록시 활용 - 데이터 검증 예시
const validateAge = {
    set: function(object, property, value) {
        if(property === 'age') {
            if(value < 18) {
                throw new Error('you are too young!');
            }
            else { // 기본 동작
                object[property] = value;
                return true;
            }
        }
    }
};

const user = new Proxy({}, validateAge);

// user.age = 17; // Uncaught Error : you are too young!
user.age = 21;
// user 객체의 age 속성을 설정할 때마다 validateAge 함수가 실행되어 age 속성의 값이 18보다 작은 경우 오류를 발생시킴.
// 프록시는 동일한 내용의 게터와 세터를 많은 속성에 적용해야 할 때 매우 유용하다.
// 이럴 때 프록시를 사용하면 하나의 게터와 하나의 세터만 정의하면 된다.

// 프록시를 사용하지 않는 예시
const dog_no_proxy = {
    // 자바스크립트 코딩 관습 : '_' 기호는 private 속성을 정의하는 데 사용된다.(클래스 내부에서만 접근 가능)
    // 강제하는 것은 아니지만, 개발자가 private 속성을 빠르게 식별할 수 있도록 이렇게 사용하곤 한다.
    // 또한 setter의 이름이 name이기 때문에 그냥 name을 속성으로 사용한다면 무한 루프가 발생한다. -> setter의 이름을 바꿔도 무관함.
    _name : 'pup',
    _age : 7,

    get name() {
        log(this._name);
    },
    get age() {
        log(this._age);
    },

    set name(newName) {
        this._name = newName;
        log(this._name);
    },
    set age(newAge) {
        this._age = newAge;
        log(this._age);
    },
};

log("without proxy")
dog_no_proxy.name; // pup
dog_no_proxy.age; // 7
dog_no_proxy.breed; // 아무것도 안 나옴(undefined)
dog_no_proxy.name = 'Max'; // Max
dog_no_proxy.age = 8; // 8

// 프록시를 사용한 예시
// 효과 : 더 짧고 깔끔한 코드, 사용할 수 없는 속성에 접근할 때 사용자 지정 메시지 출력
const dog_proxy = {
    name: 'pup',
    age : 7,
};
const handler = {
    get: (target, property) => {
        property in target ? log(target[property]) : log('property not found');
    },
    set : (target, property, value) => {
        target[property] = value;
        log(target[property]);
    },
};
// dog 객체를 만들었지만, 객체 내부에 setter, getter를 따로 정의하지 않음.
// 대신 하나의 게터와 세터로 모든 속성을 처리할 수 있도록 handler를 만들었다.
// getter : 객체와 속성 두 인수를 받아 해당 객체에 해당 속성이 존재하는지 확인하고, 존재하면 출력하고 존재하지 않으면 property not found를 출력
// setter : 세 인수(target, property, value)를 받아서 속성을 새 값으로 설정하고 출력한다.

const dogProxy2 = new Proxy(dog_proxy, handler);
log("with proxy")
dogProxy2.name; // pup
dogProxy2.age; // 7
dogProxy2.name = 'Max'; // Max
dogProxy2.age = 8; // 8
dogProxy2.breed; // property not found
// Object : 객체
/*
객체 : 실제로 존재하는 사물을 의미하고 이름과 값으로 구성된 속성(property)을 가진 자바스크립트의 기본 데이터 타입으로 이야기할 수 있음.
배열도 객체라고 할 수 있음.
객체는 중괄호('{', '}')로 생성하며, 다음과 같은 형태의 자료를 쉼표(,)로 연결해서 입력함
객체 내부에 있는 값 : 속성
객체의 속성 중 함수 자료형인 속성을 특별히 method라고 함.
 */

const log = console.log;

log(typeof ([])) // "object"

const product = {
    제품명 : '7D 건조 망고',
    유형 : '당절임',
    성분 : '망고, 설탕, 메타중아황산나트륨, 치자황색소'
}
log(product)
log(JSON.stringify(product, null, 2)) // value, replacer, space

delete product.성분 // 속성 제거
log(JSON.stringify(product, null, 2)) // value, replacer, space

const pet = {
    name: '구름',
    eat(food) { // 기존 - eat : function (food)
        log(this.name + '은/는 ' + food + '을/를 먹습니다.')
    }
}

pet.eat('밥')

// 익명 함수와 화살표 함수는 객체의 메서드로 사용될 때 this 키워드를 다루는 방식이 다르다.
const test = {
    a: function() {
        log(this)
    },
    b: () => {
        log(this)
    },
}

test.a() // { a: [Function: a], b: [Function: b] }
test.b() // {}
// 메서드 내부에서 this 키워드를 사용할 때 의미가 달라지므로 화살표 함수를 메서드로 사용하지 않는 편임.
const log = console.log;
class Student {
    constructor(이름, 국어, 영어, 수학, 과학) {
        this.이름 = 이름;
        this.국어 = 국어;
        this.영어 = 영어;
        this.수학 = 수학;
        this.과학 = 과학;
    }

    getSum() {
        return this.국어 + this.영어 + this.수학 + this.과학;
    }
    getAverage() {
        return this.getSum() / 4;
    }
    toString() {
        return `${this.이름}\t${this.getSum()}점\t${this.getAverage()}점\n`;
    }
}

const students = []
students.push(new Student('구름', 87, 98, 88, 90));
students.push(new Student('별이', 92, 98, 96, 88));
students.push(new Student('겨울', 76, 96, 94, 86));
students.push(new Student('바다', 98, 52, 98, 92));

let output = '이름\t총점\t평균\n'
for(const s of students) {
    output += s.toString();
}
log(output);


// 사각형 클래스
class Rectangle {
    #width
    #height
    constructor(width, height) {
        if(width <= 0 || height <=0) {
            throw '길이는 0보다 커야 합니다.'
        }
        this.#width = width;
        this.#height = height;
    }

    get perimeter() { // 둘레
        return 2 * (this.#width + this.#height);
    }

    get area() {
        return this.#width * this.#height;
    }

    get width() {
        return this.#width;
    }

    set width(w) {
        if(w <= 0) {
            throw '길이는 0보다 커야 합니다.'
        }
        this.#width = w;
    }

    get height() {
        return this.#height;
    }

    set height(h) {
        if(h <= 0) {
            throw '길이는 0보다 커야 합니다.'
        }
        this.#height = h;
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

const square = new Square(10,20);
log(`정사각형의 둘레 : ${square.perimeter}`)
log(`정사각형의 넓이 : ${square.area}`)
square.height = 200; // setter 없으면 수행되지 않음.
log(`정사각형의 둘레 : ${square.perimeter}`)
log(`정사각형의 넓이 : ${square.area}`)


// override : 부모가 갖고 있는 함수를 자식에게 다시 선언해서 덮어쓰기
class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age 
    }

    toString() { // Object 클래스의 toString override
        return `이름 : ${this.name}\n나이: ${this.age}살`;
    }
}

const pet = new Pet('구름', 6);
log(pet + ' ');
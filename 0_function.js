// <0> 기본 내용
const log = console.log;

function Car(maker, color) {
    this.carMaker = maker;
    this.carColor = color;
}

function MyCar(maker, color) {
    // Car.call(this, maker, color); // .call : 인수의 목록을 받음
    Car.apply(this, [maker,color]); // .apply : 인수 목록이 담긴 배열을 받음
    this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
log(myNewCar.carMaker);
log(myNewCar.carColor);
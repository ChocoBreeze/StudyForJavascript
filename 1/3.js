const log = console.log;

// use destructuring.
// 함수 기본값 인수
function calculatePrice({total =0, tax = 0.1, tip = 0.05,} = {}) {
    return total + (total * tax) + (total * tip);
}

const bill = calculatePrice({tip:0.15, total:150});
log(bill)
// 매개변수가 어떻게 전달되던지 인수는 객체가 됨
log(calculatePrice({}));
log(calculatePrice());
log(calculatePrice(undefined));
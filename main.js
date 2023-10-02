//関数を定義
const fizzbuzz = (a) => {
  
  //条件分岐
  if (a % 3 === 0 && a % 5 === 0) {
    return "FizzBuzz";
  } else if (a % 3 === 0) {
    return "Fizz";
  } else if (a % 5 === 0) {
    return "Buzz";
  } else {
    return a;
  }
};

//1〜maxまでのループ
const max = 100;
for (let b = 1; b <= max; b++) {
  console.log(fizzbuzz(b));
}
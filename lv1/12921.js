// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12921

function solution(n) {
  const numArr = new Array(n + 1).fill(1); // 1: 소수, 0: n의 배수
  numArr[0] = 0;
  numArr[1] = 0;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (numArr[i] === 0) continue;

    for (let j = 2; i * j <= n; j++) {
      // i의 배수
      numArr[i * j] = 0;
    }
  }

  return numArr.filter((v) => v).length;
}

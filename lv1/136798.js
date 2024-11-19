// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/136798

function solution(number, limit, power) {
  const numberArr = new Array(number + 1).fill(0);
  numberArr[1] = 1;

  for (let i = 2; i <= number; i++) {
    const currentNum = i;
    const sqrtNum = Math.sqrt(currentNum);

    if (Number.isInteger(sqrtNum)) {
      numberArr[currentNum] = 1; // 제곱근
    }

    for (let j = 1; j < sqrtNum; j++) {
      if (currentNum % j) continue;

      numberArr[currentNum] += 2; // 약수는 2배
    }
  }

  return numberArr.reduce((acc, cur) => acc + (cur > limit ? power : cur), 0);
}

// 완전 탐색 + 완전 탐색이라 범위를 줄여야 하는 문제
// 제곱근이 힌트

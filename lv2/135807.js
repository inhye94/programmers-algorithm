// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/135807

function solution(arrayA, arrayB) {
  // NOTE: 각 배열의 최대공약수 계산
  let gcdA = calculateGCD(arrayA);
  let gcdB = calculateGCD(arrayB);

  // NOTE: 각 배열이 상대의 최대공약수로 나눠지는지 체크
  const isDivisibleByGcdA = arrayB.some((el) => el % gcdA === 0);
  const isDivisibleByGcdB = arrayA.some((el) => el % gcdB === 0);

  // NOTE: 조건에 따라 결과 반환
  if (isDivisibleByGcdA && isDivisibleByGcdB) return 0;
  if (isDivisibleByGcdA) return gcdB;
  if (isDivisibleByGcdB) return gcdA;
  return Math.max(gcdA, gcdB);
}

// 최대공약수 계산 함수
const calculateGCD = (arr) => arr.reduce((gcd, num) => getGCD(gcd, num));
const getGCD = (a, b) => (b > 0 ? getGCD(b, a % b) : a);

// ================================================================
// NOTE: 다른 사람의 풀이
function solution(arrayA, arrayB) {
  const aResult = findValidGCD(arrayA, arrayB);
  const bResult = findValidGCD(arrayB, arrayA);

  return Math.max(aResult, bResult);
}

function findValidGCD(currentArr, otherArr) {
  const min = Math.min(...currentArr);

  for (let divisor = min; divisor > 1; divisor--) {
    if (
      currentArr.every((num) => num % divisor === 0) &&
      !otherArr.some((num) => num % divisor === 0)
    )
      return divisor;
  }

  return 0;
}

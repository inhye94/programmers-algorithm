// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/140107

/**
 * NOTE: 원의 방정식
 * x^2 + y^2 ≤ d^2
 */

function solution(k, d) {
  let totalPoints = 0;

  for (let x = 0; x <= d; x += k) {
    let y = Math.sqrt(d * d - x * x);
    totalPoints += Math.floor(y / k) + 1;
  }

  return totalPoints;
}

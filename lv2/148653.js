// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/148653

function solution(storey) {
  // NOTE: 탑다운 재귀로 자릿수 올림/내림
  function calcMinCost(num) {
    if (num < 5) return num;

    const 자릿수 = num % 10;
    const 다음수 = Math.floor(num / 10);

    const 내림 = 자릿수 + calcMinCost(다음수);
    const 올림 = calcMinCost(다음수 + 1) + (10 - 자릿수);

    return Math.min(내림, 올림);
  }

  return calcMinCost(storey);
}

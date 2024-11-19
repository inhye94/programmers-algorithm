// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/135808

function solution(k, m, score) {
  const descScore = [0, ...score.sort((a, b) => b - a)];

  let price = 0;
  let i = m;

  while (descScore[i]) {
    price += descScore[i] * m;
    i += m;
  }

  return price;
}

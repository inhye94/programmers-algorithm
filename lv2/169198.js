// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/169198

function solution(m, n, startX, startY, balls) {
  const mirrors = [
    [startX * -1, startY], // 좌
    [startX, startY * -1], // 하
    [2 * m - startX, startY], // 우
    [startX, 2 * n - startY], // 상
  ];

  return [...balls].map(([ballX, ballY]) => {
    let minDist = Infinity;

    for (let [mirrorX, mirrorY] of mirrors) {
      if (startX === ballX && isBetween(startY, mirrorY, ballY)) continue;
      if (startY === ballY && isBetween(startX, mirrorX, ballX)) continue;

      minDist = Math.min(calcDist(mirrorX - ballX, mirrorY - ballY), minDist);
    }

    return minDist;
  });
}

// NOTE: 계산함수
function isBetween(start, mirror, ball) {
  return (start < ball && ball < mirror) || (start > ball && ball > mirror);
}

function calcDist(x, y) {
  return x ** 2 + y ** 2;
}

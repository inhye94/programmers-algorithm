// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/154540

function solution(maps) {
  const Y = maps.length;
  const X = maps[0].length;
  const dirArr = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const stayArr = [];

  // visited (false: 방문 안 함, true: 방문함)
  const visitedArr = Array.from({ length: Y }, () => Array(X).fill(false));

  // maps 분해
  const mapArr = maps.map((row) => row.split(""));

  // 링크된 애들을 찾기
  for (let i = 0; i < Y; i++) {
    for (let j = 0; j < X; j++) {
      // 바다거나 방문했던 곳이면 넘기기
      if (mapArr[i][j] === "X" || visitedArr[i][j]) continue;

      // visited 처리
      visitedArr[i][j] = true;

      // linked map 찾기
      const queue = [[i, j]];
      let sum = Number(mapArr[i][j]);

      while (queue.length) {
        const [y, x] = queue.shift();

        // 상하좌우를 탐색하면서 (범위 내, X 제외한 대상)
        for (let [moveY, moveX] of dirArr) {
          const nextY = y + moveY;
          const nextX = x + moveX;

          if (
            nextX >= X ||
            nextX < 0 ||
            nextY >= Y ||
            nextY < 0 ||
            mapArr[nextY][nextX] === "X" ||
            visitedArr[nextY][nextX]
          ) {
            continue;
          }

          // visited 처리
          visitedArr[nextY][nextX] = true;

          // stack에 넣고 sum 계산
          queue.push([nextY, nextX]);
          sum += Number(mapArr[nextY][nextX]);
        }
      }

      // 체류일 최대값 push
      stayArr.push(sum);
    }
  }

  if (stayArr.length === 0) return [-1];
  else return stayArr.sort((a, b) => a - b);
}

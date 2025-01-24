// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/159993

function solution(maps) {
  const N = maps.length;
  const M = maps[0].length;
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]; // 이동방향, [가로, 세로]

  // NOTE: 위치 찾기
  const { start, end, leber } = getPos(maps, N, M);

  // NOTE: 레버부터 모든 통로까지의 거리 구하기
  const queue = [leber];
  const visitedMap = Array.from({ length: N }, () => Array(M).fill(0)); // 0: 방문 전, 1이상: 방문
  // NOTE: 지역함수
  const isValid = (nextRow, nextCol) => {
    return nextRow < N && nextRow >= 0 && nextCol < M && nextCol >= 0;
  };
  const isPath = (nextRow, nextCol) => {
    return maps[nextRow][nextCol] !== "X";
  };

  while (queue.length) {
    const [curRow, curCol] = queue.shift();

    for (let [i, j] of dir) {
      const nextRow = curRow + i;
      const nextCol = curCol + j;

      if (
        isValid(nextRow, nextCol) &&
        isPath(nextRow, nextCol) &&
        visitedMap[nextRow][nextCol] === 0
      ) {
        visitedMap[nextRow][nextCol] = visitedMap[curRow][curCol] + 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  // NOTE: 최단 경로 찾기
  const distS = visitedMap[start[0]][start[1]];
  const distE = visitedMap[end[0]][end[1]];

  if (distS === 0 || distE === 0) return -1;

  return distS + distE;
}

function getPos(maps, N, M) {
  const pos = { start: null, end: null, leber: null };
  let count = 0;

  for (let row = 0; row < N; row++) {
    // NOTE: S, L, E 모두 찾은 경우
    if (count === 3) break;

    for (let col = 0; col < M; col++) {
      const value = maps[row][col];

      if (value === "S") {
        count += 1;
        pos.start = [row, col];
      }

      if (value === "L") {
        count += 1;
        pos.leber = [row, col];
      }

      if (value === "E") {
        count += 1;
        pos.end = [row, col];
      }

      // NOTE: S, L, E 모두 찾은 경우
      if (count === 3) break;
    }
  }

  return pos;
}

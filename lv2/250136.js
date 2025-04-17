// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/250136

function solution(land) {
  const [N, M] = [land.length, land[0].length];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const oilPerColumn = Array(M).fill(0); // 열마다 oil량 저장 (최적화)
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(x, y) {
    const queue = [[x, y]];
    const colums = new Set([x]);
    let count = 1;
    visited[y][x] = true;

    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let [dx, dy] of dir) {
        const [nx, ny] = [dx + cx, dy + cy];

        if (
          0 <= nx &&
          nx < M &&
          0 <= ny &&
          ny < N &&
          !visited[ny][nx] &&
          land[ny][nx]
        ) {
          queue.push([nx, ny]);
          count += 1;
          colums.add(nx);
          visited[ny][nx] = true;
        }
      }
    }

    // 열마다 oil량 저장
    for (let col of colums) {
      oilPerColumn[col] += count;
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && land[y][x]) {
        bfs(x, y);
      }
    }
  }

  return Math.max(...oilPerColumn);
}

// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/388353

function solution(storage, requests) {
  const [N, M] = [storage.length, storage[0].length];
  const accessible = Array.from({ length: N }, () => Array(M).fill(false));

  for (let request of requests) {
    const char = request[0];

    if (isCrane(request)) {
      moveCrane(char, storage, accessible);
    } else {
      moveForklift(char, storage, accessible);
    }
  }

  return accessible.flat(Infinity).filter((v) => !v).length;
}

function bfs(i, j, accessible, storage, dir) {
  const [N, M] = [storage.length, storage[0].length];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const queue = [[i, j]];
  visited[i][j] = true;

  while (queue.length) {
    const [x, y] = queue.shift();

    // 테두리에 닿은 경우
    if (x === 0 || x === N - 1 || y === 0 || y === M - 1) {
      return true;
    }

    for (let [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];

      // 지게차가 접근 가능한 경우
      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        !visited[nx][ny] &&
        accessible[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return false;
}

function moveForklift(char, storage, accessible) {
  const [N, M] = [storage.length, storage[0].length];
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const stack = [];

  // 지게차 접근 가능한지 확인
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (storage[i][j] === char && bfs(i, j, accessible, storage, dir)) {
        stack.push([i, j]);
      }
    }
  }

  // accessible 처리
  for (let [x, y] of stack) {
    accessible[x][y] = true;
  }
}

function moveCrane(char, storage, accessible) {
  const [N, M] = [storage.length, storage[0].length];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (char === storage[i][j]) {
        accessible[i][j] = true;
      }
    }
  }
}

function isCrane(request) {
  return request.length === 2;
}
